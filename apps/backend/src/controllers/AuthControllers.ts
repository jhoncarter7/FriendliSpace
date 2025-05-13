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
    const { name, email, password, specialties } = req.body;
    const role = "FRIEND";

    if (!email || !password || !specialties) {
      return next(new Error("fill all input"));
    }

    console.log("specialties", specialties, req.body);

    const existingUser = await prismaClient.user.findUnique({
      where: { email },
    });
    console.log("existingUser", existingUser);
    if (existingUser) {
      res.status(409).json({ message: "user already exist" });
      return;
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    console.log("passwordHash", passwordHash);

    let validatedSpecialties: string[] = [];
    if (specialties) {
      if (typeof specialties === "string") {
        // If specialties is a string, split by comma and trim
        validatedSpecialties = specialties
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0);
      } else if (Array.isArray(specialties)) {
        // If it's already an array, just trim and filter out empty values
        validatedSpecialties = specialties
          .map((s: any) => typeof s === "string" ? s.trim() : "")
          .filter((s: string) => s.length > 0);
      } else {
        res.status(400).json({
          message: "Specialties must be provided as an array or comma separated string.",
        });
        return;
      }
    }

    console.log("creating friend with specialties:", validatedSpecialties);

    const newUser = await prismaClient.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          email,
          passwordHash,
          role,
        },
      });

      await tx.friend.create({
        data: {
          userId: user.id,
          specialties: validatedSpecialties,
        },
      });

      return tx.user.findUnique({
        where: { id: user.id },
        include: {
          friendProfile: true,
        },
      });
    });
    console.log("friend created", newUser);
    if (!newUser) {
      throw new Error("User creation failed during transaction.");
    }
    const { passwordHash: _, ...userResponse } = newUser;
    res.status(201).json({
      message: "Friend registered successfully. Please complete your profile.",
      user: userResponse,
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
    res.status(200).cookie("accesToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
    }).json({
      message: "Login successful ",
      userId: findUser?.id,
      token: token,
      user: { id: findUser?.id, name: findUser?.name, role: findUser?.role },
    });
  } catch (error) {
    next(error);
  }
};

export { registerSeeker, registerFriend, login };
