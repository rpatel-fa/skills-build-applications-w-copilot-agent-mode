import { Router } from 'express';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models';

const router = Router();

router.get('/users/', async (_req, res, next) => {
  try {
    const users = await User.find().sort({ username: 1 });
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/teams/', async (_req, res, next) => {
  try {
    const teams = await Team.find().populate('members').sort({ name: 1 });
    res.json(teams);
  } catch (error) {
    next(error);
  }
});

router.get('/activities/', async (_req, res, next) => {
  try {
    const activities = await Activity.find()
      .populate('user')
      .populate('team')
      .sort({ activityDate: -1 });
    res.json(activities);
  } catch (error) {
    next(error);
  }
});

router.get('/leaderboard/', async (_req, res, next) => {
  try {
    const leaderboard = await LeaderboardEntry.find()
      .populate('user')
      .populate('team')
      .sort({ rank: 1 });
    res.json(leaderboard);
  } catch (error) {
    next(error);
  }
});

router.get('/workouts/', async (_req, res, next) => {
  try {
    const workouts = await Workout.find().sort({ difficulty: 1, title: 1 });
    res.json(workouts);
  } catch (error) {
    next(error);
  }
});

export default router;