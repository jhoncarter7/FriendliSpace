import { Gender, prismaClient } from "@repo/db/client";
import { NextFunction, Request, Response } from "express";

const getCurrentUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      res
        .status(401)
        .json({ message: "Unauthorized: No user ID found in request." });
      return;
    }

    const userProfile = await prismaClient.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        profile: true,
        friendProfile: true,
      },
    });

    if (!userProfile) {
      res.status(404).json({ message: "User profile not found." });
      return;
    }

    res.status(200).json(userProfile);
  } catch (error) {
    console.error("Get Current User Profile Error:", error);
    next(error);
  }
};

const updateCurrentUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user?.id;
    console.log("profile update");
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { displayName, bio, gender, interests, avatarUrl } = req.body;
    const profileData: any = {};

    if (displayName !== undefined) profileData.displayName = displayName;
    if (bio !== undefined) profileData.bio = bio;
    
    if (gender !== undefined) {
      const normalized = gender.toUpperCase() as Gender;
      if (Object.values(Gender).includes(normalized)) {
        profileData.gender =normalized;
      } else {
        console.warn("Invalid gender value provided:", gender);

        res.status(400).json({ message: "Invalid gender value.", gender });
      }
    }

    if (interests !== undefined) {
      if (
        Array.isArray(interests) &&
        interests.every((i) => typeof i === "string")
      ) {
        profileData.interests = interests
          .map((i) => i.trim())
          .filter((i) => i.length > 0); 
      } else {
        console.warn("Invalid interests format provided:", interests);
        res.status(400).json({ message: "Invalid interests format." });
      }
    }
    if (avatarUrl !== undefined) profileData.avatarUrl = avatarUrl;

    if (Object.keys(profileData).length === 0) {
      res
        .status(400)
        .json({ message: "No valid profile fields provided for update." });
    }

    const updatedOrCreatedProfile = await prismaClient.profile.upsert({
      where: { userId: userId },
      update: profileData,
      create: {
        userId: userId,
        ...profileData,
      },
    });

    if (!updatedOrCreatedProfile) {
      res.status(404).json({ message: "Profile not found." });
      return;
    }
    res.status(200).json(updatedOrCreatedProfile);
  } catch (error) {
    console.error("Update/Create Profile Error:", error);
    next(error);
  }
};

const getUserProfileById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const publicProfile = await prismaClient.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        role: true,
        createdAt: true,
        profile: {
          select: {
            displayName: true,
            bio: true,
            gender: true,
            interests: true,
            avatarUrl: true,
          },
        },
        friendProfile: {
          select: {
            specialties: true,
            isVerified: true,
            averageRating: true,
            totalReviews: true,
          },
        },
      },
    });

    if (!publicProfile) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(publicProfile);
  } catch (error) {
    console.error("Get User Profile By ID Error:", error);
    next(error);
  }
};

export { getCurrentUserProfile, updateCurrentUserProfile, getUserProfileById };
