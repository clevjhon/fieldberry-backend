import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { BOM_ROOTS, getBomRoot } from './bom.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req,res)=> res.json({status:'ok', service:'fieldberry-backend', time: new Date().toISOString()}));
app.get('/api/health', (req,res)=> res.json({ok:true}));

app.get('/api/bom', (req,res)=> res.json(BOM_ROOTS));
app.get('/api/bom/:key', (req,res)=> {
  const bom = getBomRoot(req.params.key);
  if(!bom) return res.status(404).json({error:'BOM root not found'});
  res.json(bom);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`fieldberry-backend running on ${PORT}`));
