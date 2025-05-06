import e, { NextFunction, Request, Response } from "express";
import { prismaClient } from "@repo/db/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const generateToken = (userId: string, role: "SEEKER" | "FRIEND") => {
  return jwt.sign({ userId, role }, process.env.JWT_KEY as string, {
    expiresIn: "1d",
  });
};

const registerSeeker = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;
  try {
    if (!email || !password) {
      return next(new Error("fill all input"));
    }

    const existingUser = await prismaClient.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      res.status(409).json({ message: "user already exist" });
      return;
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const resp = await prismaClient.user.create({
      data: {
        email,
        passwordHash,
        name,
        role: "SEEKER",
      },
    });
    const token = generateToken(resp?.id, "SEEKER");
    res.status(201).cookie("accesToken", token).json({
      message: "Seeker registered successfully",
      id: resp?.id,
      role: resp.role,
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

const registerFriend = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {name, email, password, specialties } = req.body;
    const role = "FRIEND";

    if (!email || !password || !specialties) {
      return next(new Error("fill all input"));
    }

    const existingUser = await prismaClient.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(409).json({ message: "user already exist" });
      return;
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    let validatedSpecialties: string[] = [];
    if (specialties) {
      if (!Array.isArray(specialties)) {
        res.status(400).json({
          message: "Specialties must be provided as an array of strings.",
        });
        return;
      }
      validatedSpecialties = specialties
        .filter((s) => typeof s === "string" && s.trim().length > 0)
        .map((s) => s.trim());
    }

    const newUser = await prismaClient.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          passwordHash,
          role,
        },
      });

      const fr = await tx.friend.create({
        data: {
          userId: user.id,
          specialties: validatedSpecialties,
        },
      });

      return tx.user.findUnique({
        where: { id: user.id },
        include: {
          // profile: true, // Excluded
          friendProfile: true,
        },
      });
    });

    if (!newUser) {
      // Transaction failed somehow
      throw new Error("User creation failed during transaction.");
    }
    const { passwordHash: _, ...userResponse } = newUser;
    res.status(201).json({
      message: "Friend registered successfully. Please complete your profile.",
      user: userResponse, // Contains id, email, role, friendProfile etc. but NO profile
      token: generateToken(newUser.id, role),
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
    return;
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).json({ message: "fill all input" });
      return;
    }
    const existingUser = await prismaClient.user.findUnique({
      where: { email },
    });
    if (!existingUser) {
      res.status(401).json({ message: "wrong credential" });
      return;
    }
    const findUser = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    const isMatch = await bcrypt.compare(
      password,
      findUser?.passwordHash as string
    );
    if (!isMatch) {
      res.status(401).json({ message: "wrong credential" });
      return;
    }
    const token = generateToken(
      findUser?.id as string,
      findUser?.role as "SEEKER" | "FRIEND"
    );
    if (!token) {
      res.status(401).json({ message: "wrong credential" });
      return;
    }
    res.status(200).cookie("accesToken", token).json({
      message: "Login successful ",
      userId: findUser?.id,
      token: token,
      role: findUser?.role,
    });
  } catch (error) {
    next(error);
  }
};

export { registerSeeker, registerFriend, login };
