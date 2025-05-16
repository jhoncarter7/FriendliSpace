"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Api } from "@/lib/api";
import { useStore } from "@tanstack/react-store";
import { authStore } from "@/lib/store/store";
import { Input } from "../components/ui/input";

const GENDERS = [
  "MALE",
  "FEMALE",
  "NON_BINARY",
  "OTHER",
  "PREFER_NOT_TO_SAY",
];

const UpdateProfile = () => {
  // Get the role (e.g., "SEEKER" or "FRIEND") from our auth store
  const { user } = useStore(authStore, (state) => state);
  const { role } = { ...user }

  console.log("role", role)
  // Profile state (common for both roles)
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [interestInput, setInterestInput] = useState("");
  const [avatar, setAvatar] = useState("");

  const [specialties, setSpecialties] = useState<string[]>([]);
  const [hourlyRate, setHourlyRate] = useState(0);
  const [perMinuteRate, setPerMinuteRate] = useState(0);
  const [availabilityJson, setAvailabilityJson] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${Api.GETCURRENTUSERPROFILE}`, { withCredentials: true });
      
        const { profile, friendProfile } = response.data;
        setDisplayName(profile.displayName);
        setBio(profile.bio);
        setGender(profile.gender);
        setInterests(profile.interests);
        setAvatar(profile.avatarUrl);

        // If the logged in user is a FRIEND, set friend-specific fields
        if (role === "FRIEND" && friendProfile) {
          setSpecialties(friendProfile.specialties);
          // Optionally populate these if your friend record includes them
          setHourlyRate(friendProfile.hourlyRate || 0);
          setPerMinuteRate(friendProfile.perMinuteRate || 0);
        }
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      }
      setLoading(false);
    };
    fetchUserProfile();
  }, [role]);

  const handleAddInterest = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && interestInput.trim()) {
      e.preventDefault();
      if (!interests.includes(interestInput.trim())) {
        setInterests([...interests, interestInput.trim()]);
      }
      setInterestInput("");
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setInterests(interests.filter(i => i !== interest));
  };

  // For friend-only specialties
  const handleAddSpecialty = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim()) {
      e.preventDefault();
      const newSpecialty = e.currentTarget.value.trim();
      if (!specialties.includes(newSpecialty)) {
        setSpecialties([...specialties, newSpecialty]);
      }
      e.currentTarget.value = "";
    }
  };

  const handleRemoveSpecialty = (specialty: string) => {
    setSpecialties(specialties.filter(s => s !== specialty));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Always update profile
      await axios.put(
        `${Api.UPDATECURRENTUSERPROFILE}`,
        {
          displayName,
          bio,
          gender,
          interests,
          avatarUrl: avatar,
          
        },
        { withCredentials: true }
      );

      // If the user is a FRIEND, also update friend details
      if (role === "FRIEND") {
        await axios.put(
          `${Api.UPDATEFRIENDPROFILE}`, // Ensure this endpoint matches your friend update route
          {
            specialties,
            hourlyRate,
            perMinuteRate,
            availabilityJson
          },
          { withCredentials: true }
        );
      }

      alert("Profile updated!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Profile fields */}
        <div>
          <label className="block font-medium mb-1">Display Name</label>
          <Input
            type="text"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Your display name"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Bio</label>
          <textarea
            value={bio}
            onChange={e => setBio(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Tell us about yourself"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Gender</label>
          <select
            value={gender}
            onChange={e => setGender(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="">Select gender</option>
            {GENDERS.map(g => (
              <option key={g} value={g}>{g.replace("_", " ")}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Avatar URL</label>
          <Input
            type="text"
            value={avatar}
            onChange={e => setAvatar(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="https://example.com/avatar.jpg"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Interests</label>
          <Input
            type="text"
            value={interestInput}
            onChange={e => setInterestInput(e.target.value)}
            onKeyDown={handleAddInterest}
            className="w-full border rounded p-2"
            placeholder="Type interest and press Enter"
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {interests.map((interest, idx) => (
              <span key={idx} className="bg-gray-200 px-2 py-1 rounded flex items-center">
                {interest}
                <button
                  type="button"
                  className="ml-2 text-red-500"
                  onClick={() => handleRemoveInterest(interest)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Friend-specific fields */}
        {role === "FRIEND" && (
          <>
            <div>
              <label className="block font-medium mb-1">Availability</label>
              <select
                value={availabilityJson}
                onChange={e => setAvailabilityJson(e.target.value)}
                className="w-full border rounded p-2"
              >
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="not_available">Not Available</option>
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Specialties</label>
              <Input
                type="text"
                onKeyDown={handleAddSpecialty}
                className="w-full border rounded p-2"
                placeholder="Type specialty and press Enter"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {specialties.map((specialty, idx) => (
                  <span key={idx} className="bg-gray-200 px-2 py-1 rounded flex items-center">
                    {specialty}
                    <button
                      type="button"
                      className="ml-2 text-red-500"
                      onClick={() => handleRemoveSpecialty(specialty)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <label className="block font-medium mb-1">Hourly Rate</label>
              <Input
                type="number"
                value={hourlyRate}
                onChange={e => setHourlyRate(Number(e.target.value))}
                className="w-full border rounded p-2"
                placeholder="Hourly Rate"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Per Minute Rate</label>
              <Input
                type="number"
                value={perMinuteRate}
                onChange={e => setPerMinuteRate(Number(e.target.value))}
                className="w-full border rounded p-2"
                placeholder="Per Minute Rate"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;