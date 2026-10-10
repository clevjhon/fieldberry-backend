import express from 'express';
const router = express.Router();

// GitHub Marketplace purchase webhook — this makes you HOST
router.post('/webhook', (req,res)=>{
  const event = req.headers['x-github-event'];
  const action = req.body.action;
  const plan = req.body.marketplace_purchase?.plan?.id || 14948;
  
  console.log(`[MARKETPLACE HOST] Event=${event} Action=${action} Plan=${plan}`);
  console.log('Buyer:', req.body.marketplace_purchase?.account?.login);
  
  // Accept all purchases for plan 14948
  if(event==='marketplace_purchase'){
    // Here you would provision user: unlock exe v14-exe-133
    console.log(`Provisioning plan 14948 for ${req.body.marketplace_purchase.account.login}`);
  }
  
  res.status(200).json({ ok:true, host:'fieldberry-backend', plan_id:14948, received:event });
});

router.get('/setup', (req,res)=>{
  const planId = req.query.plan_id || 14948;
  res.send(`
    <h1>API Sietehr Foundation — Connected as Host</h1>
    <p>Plan ${planId} activated</p>
    <p>Backend: fieldberry-backend.onrender.com</p>
    <p>Release: v14-exe-133 linked</p>
    <a href="https://github.com/Colegio-San-Caio/demo-repository/releases/tag/v14-exe-133">Download exe</a>
  `);
});

export default router;
