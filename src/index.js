import express from 'express';
import cors from 'cors';
import { BOM_ROOTS, getBomRoot } from './bom.js';
import marketplaceRouter from './marketplace.js';

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get('/',(req,res)=>res.json({status:'ok',service:'fieldberry-backend',host:'marketplace',plan:14948,time:new Date().toISOString()}));
app.get('/api/bom',(req,res)=>res.json(BOM_ROOTS));
app.get('/api/bom/:key',(req,res)=>{
  const b=getBomRoot(req.params.key);
  if(!b) return res.status(404).json({error:'not found'});
  res.json(b);
});

app.use('/api/github', marketplaceRouter);
app.post('/api/github/webhook', marketplaceRouter);

app.get('/api/health',(req,res)=>res.json({ok:true,plan:14948,release:'v14-exe-133'}));

const PORT=process.env.PORT||3000;
app.listen(PORT,'0.0.0.0',()=>console.log('HOST running plan 14948 on '+PORT));
