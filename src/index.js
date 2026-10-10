import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { BOM_ROOTS, getBomRoot } from './bom.js';
const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use((req,res,next)=>{
  res.cookie('dns_secure','1',{httpOnly:true,secure:true,sameSite:'Strict',path:'/'});
  next();
});
app.get('/api/health',(req,res)=>res.json({ok:true}));
app.get('/api/bom',(req,res)=>res.json(BOM_ROOTS));
app.get('/api/bom/:key',(req,res)=>{
  const b=getBomRoot(req.params.key);
  if(!b) return res.status(404).json({error:'not found'});
  res.json(b);
});
app.listen(process.env.PORT||3000,'0.0.0.0',()=>console.log('running'));
