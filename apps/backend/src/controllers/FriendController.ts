import { Gender, Prisma, prismaClient, UserRole } from "@repo/db/client";
import { Request, Response, NextFunction } from "express";




const  updateMyFriendDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
     
      const userId = (req as any).user?.id;
      const userRole = (req as any).user?.role;
      console.log("userRole", userRole, "userId", userId, UserRole.FRIEND)
      if (!userId || userRole !== UserRole.FRIEND) {
         res.status(403).json({ message: 'Forbidden: User is not a Friend or not authenticated' });
         return;
      }

    
      const { availabilityJson, specialties, hourlyRate, perMinuteRate } = req.body;
      const friendData: Prisma.FriendUpdateInput  = {};
       if (availabilityJson !== undefined) friendData.availabilityJson = availabilityJson;

       if (specialties !== undefined) {
           if (Array.isArray(specialties)) {
               // Filter out non-strings or empty strings, and trim whitespace
               friendData.specialties = specialties
                   .filter(s => typeof s === 'string' && s.trim().length > 0)
                   .map(s => s.trim());
           } else {
            
                 res.status(400).json({ message: 'Specialties must be provided as an array of strings.'});
                  return;
           }
       }

         if (hourlyRate !== undefined) {
              if (typeof hourlyRate === 'number' && hourlyRate >= 0) {
                friendData.hourlyRate = hourlyRate;
              } else {
                res.status(400).json({ message: 'Hourly rate must be a non-negative number.' });
                return;
              }
         }

            if (perMinuteRate !== undefined) {
                if (typeof perMinuteRate === 'number' && perMinuteRate >= 0) {
                    friendData.perMinuteRate = perMinuteRate;
                } else {
                    res.status(400).json({ message: 'Per minute rate must be a non-negative number.' });
                    return;
                }
            }

       if (Object.keys(friendData).length === 0) {
             res.status(400).json({ message: 'No valid friend detail fields provided for update.' });
             return;
       }


      const updatedFriend = await prismaClient.friend.update({
        where: { userId: userId }, 
        data: friendData,
      });

      // 4. Send updated friend data
      res.status(200).json(updatedFriend);
    } catch (error) {
         if ((error as any).code === 'P2025') { // Record to update not found
             res.status(404).json({ message: 'Friend profile not found for this user. Registration might be incomplete.' });
             return;
        }
        console.error("Update Friend Details Error:", error);
        next(error);
    }
  }

 const  searchFriends = async (req: Request, res: Response, next: NextFunction) => {
    try {
    
      const { interests, specialties, gender, minRating, page = 1, limit = 20 } = req.query;
      const pageNum = Math.max(1, parseInt(page as string, 10));
      const limitNum = Math.max(1, parseInt(limit as string, 10));
      const skip = (pageNum - 1) * limitNum;

      const whereClause: Prisma.FriendWhereInput = { user: { role: UserRole.FRIEND } };
      const profileWhere: Prisma.ProfileWhereInput = {};

      if (specialties && typeof specialties === 'string') {
          const specialtiesArray = specialties.split(',').map(s => s.trim()).filter(s => s);
          if (specialtiesArray.length > 0) whereClause.specialties = { hasSome: specialtiesArray };
      }
       if (minRating && typeof minRating === 'string') {
          const ratingNum = parseFloat(minRating);
          if (!isNaN(ratingNum)) whereClause.averageRating = { gte: ratingNum };
      }
      if (interests && typeof interests === 'string') {
          const interestsArray = interests.split(',').map(s => s.trim()).filter(s => s);
          if (interestsArray.length > 0) profileWhere.interests = { hasSome: interestsArray };
      }
      if (gender && typeof gender === 'string' && Object.values(Gender).includes(gender as Gender)) {
          profileWhere.gender = gender as Gender;
      }
      if (Object.keys(profileWhere).length > 0) {
          (whereClause.user as Prisma.UserWhereInput).profile = profileWhere;
      }


      const friends = await prismaClient.friend.findMany({
          where: whereClause,
          select: { userId: true, specialties: true, isVerified: true, averageRating: true, totalReviews: true, user: { select: { profile: { select: { displayName: true, bio: true, gender: true, interests: true, avatarUrl: true } } } } },
          skip: skip, take: limitNum, orderBy: { averageRating: 'desc' }
      });
      const totalFriends = await prismaClient.friend.count({ where: whereClause });

      res.status(200).json({
          data: friends,
          pagination: { currentPage: pageNum, totalPages: Math.ceil(totalFriends / limitNum), totalItems: totalFriends, limit: limitNum }
      });
    } catch (error) { console.error("Search Friends Error:", error); next(error); }
  }

  export { updateMyFriendDetails, searchFriends };