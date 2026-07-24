import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        username: 'maya_miles',
        email: 'maya.miles@example.com',
        firstName: 'Maya',
        lastName: 'Miles',
        profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
        fitnessLevel: 'advanced',
        joinedAt: new Date('2026-01-12'),
      },
      {
        username: 'liam_lifts',
        email: 'liam.lifts@example.com',
        firstName: 'Liam',
        lastName: 'Chen',
        profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
        fitnessLevel: 'intermediate',
        joinedAt: new Date('2026-02-04'),
      },
      {
        username: 'sofia_stride',
        email: 'sofia.stride@example.com',
        firstName: 'Sofia',
        lastName: 'Garcia',
        profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
        fitnessLevel: 'beginner',
        joinedAt: new Date('2026-03-18'),
      },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Cardio Crew',
        description: 'A team focused on endurance, interval training, and weekly distance goals.',
        members: [users[0]._id, users[2]._id],
        weeklyGoalMinutes: 420,
      },
      {
        name: 'Strength Squad',
        description: 'Progressive strength training for lifters building consistent habits.',
        members: [users[1]._id],
        weeklyGoalMinutes: 300,
      },
    ]);

    await Activity.insertMany([
      {
        user: users[0]._id,
        team: teams[0]._id,
        type: 'Trail Run',
        durationMinutes: 52,
        caloriesBurned: 610,
        activityDate: new Date('2026-07-20T07:30:00Z'),
      },
      {
        user: users[1]._id,
        team: teams[1]._id,
        type: 'Upper Body Strength',
        durationMinutes: 45,
        caloriesBurned: 420,
        activityDate: new Date('2026-07-21T18:15:00Z'),
      },
      {
        user: users[2]._id,
        team: teams[0]._id,
        type: 'Spin Class',
        durationMinutes: 40,
        caloriesBurned: 460,
        activityDate: new Date('2026-07-22T12:00:00Z'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      {
        user: users[0]._id,
        team: teams[0]._id,
        rank: 1,
        points: 1280,
        totalMinutes: 520,
      },
      {
        user: users[1]._id,
        team: teams[1]._id,
        rank: 2,
        points: 1105,
        totalMinutes: 455,
      },
      {
        user: users[2]._id,
        team: teams[0]._id,
        rank: 3,
        points: 960,
        totalMinutes: 390,
      },
    ]);

    await Workout.insertMany([
      {
        title: 'Tempo Run Builder',
        description: 'Warm up, hold a steady tempo pace, then finish with relaxed strides.',
        difficulty: 'intermediate',
        durationMinutes: 35,
        targetMuscleGroups: ['glutes', 'hamstrings', 'calves'],
        recommendedFor: 'Runners improving lactate threshold and pacing consistency.',
      },
      {
        title: 'Foundational Strength Circuit',
        description: 'A full-body circuit using squats, pushups, rows, and carries.',
        difficulty: 'beginner',
        durationMinutes: 30,
        targetMuscleGroups: ['quads', 'chest', 'back', 'core'],
        recommendedFor: 'Newer athletes building baseline strength and movement quality.',
      },
      {
        title: 'Power Lift Progression',
        description: 'Progressive sets of deadlifts, overhead press, and accessory posterior-chain work.',
        difficulty: 'advanced',
        durationMinutes: 55,
        targetMuscleGroups: ['back', 'shoulders', 'hamstrings'],
        recommendedFor: 'Experienced lifters training for strength and power.',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
