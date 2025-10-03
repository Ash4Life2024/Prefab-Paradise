const express = require('express');
const router = express.Router();
const { collection, getDocs } = require('firebase/firestore');
const { db } = require('../firebaseConfig');

// Fetch all inquiries / favorites
router.get('/firebase-data', async (req, res) => {
  try {
    const inquiriesSnap = await getDocs(collection(db, 'inquiries'));
    const favoritesSnap = await getDocs(collection(db, 'favorites'));
    const inquiries = inquiriesSnap.docs.map(doc => doc.data());
    const favorites = favoritesSnap.docs.map(doc => doc.data());
    res.json({ inquiries, favorites });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Firebase fetch failed' });
  }
});

// Stripe transactions (mock)
router.get('/stripe-transactions', async (req, res) => {
  // Replace with Stripe API fetch if live
  res.json([
    { id: 'pi_123', amount: 250000, currency: 'usd', status: 'succeeded', timestamp: new Date() },
    { id: 'pi_124', amount: 150000, currency: 'usd', status: 'succeeded', timestamp: new Date() }
  ]);
});

// ML usage (mock)
router.get('/ml-stats', async (req, res) => {
  res.json({ totalRequests: 42, recentInputs: ['test1', 'test2'], recentOutputs: ['res1', 'res2'] });
});

module.exports = router;
