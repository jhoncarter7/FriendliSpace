import { NextFunction, Request, Response } from "express";
import { prismaClient } from "@repo/db/client";

const registerSeeker = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, dispalyName } = req.body;
  try {
    const resp = await prismaClient.user.create({
      data: {
        email,
        passwordHash: password,

        role: "SEEKER",
      },
    });
    res.status(201).json({
      message: "Seeker registered successfully",
      id: resp?.id,
      role: resp.role,
      token: "JwtToken",
    });
  } catch (error) {
    next(error);
  }
};

const registerFriend = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password, specialties } = req.body;

  try {
    const resp = await prismaClient.user.create({
      data: {
        email,
        passwordHash: password,
        role: "FRIEND",
      },
    });
    res.status(201).json({
      message: "Friend registered successfully (placeholder)",
      userId: resp.id,
      role: resp.role,
      token: "jwtToken",
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const resp = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });
    if (resp?.passwordHash !== password) {
      res.status(401).json({ message: "wrong credential" });
      return;
    }
    console.log("Logging in user:", email); // Placeholder
    res.status(200).json({
      message: "Login successful (placeholder)",
      userId: resp?.id,
      token: "jwtToken",
    });
  } catch (error) {
    next(error);
  }
};

export { registerSeeker, registerFriend, login };
