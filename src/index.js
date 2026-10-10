	mport express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { BOM_ROOTS, getBomRoot } from './bom.js';

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// BY LAW - DNS secure cookie for gmx.ch
app.use((req, res, next) => {
  res.cookie('dns_secure', '1', { httpOnly: true, secure: true, sameSite: 'strict' });
  next();
});

app.get('/api/health', (req,res)=> res.json({ok:true, time: new Date().toISOString()}));
app.get('/api/bom', (req,res)=> res.json(BOM_ROOTS));
app.get('/api/bom/:key', (req,res)=> {
  const bom = getBomRoot(req.params.key);
  if(!bom) return res.status(404).json({error:'BOM root not found'});
  res.json(bom);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', ()=> console.log(`fieldberry-backend running on ${PORT}`));
