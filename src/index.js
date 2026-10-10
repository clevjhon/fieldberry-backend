import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

const BOM_ROOTS = {
  "SRT-Legal": { id: "srt-legal", status: "ok" },
  "SRT-Diner": { id: "srt-diner", status: "ok" },
  "SRT-Trading": { id: "srt-trading", status: "ok" }
};

app.get('/', (req,res)=>res.json({status:'ok', service:'fieldberry-backend', host:'marketplace', plan:14948, release:'v14-exe-133', time:new Date().toISOString()}));
app.get('/api/bom', (req,res)=>res.json(BOM_ROOTS));
app.get('/api/health', (req,res)=>res.json({ok:true, plan:14948, release:'v14-exe-133'}));
app.get('/api/github/setup', (req,res)=>{
  res.send(`<h1>Connected as Marketplace Host Plan ${req.query.plan_id||14948}</h1><p>Backend OK</p><a href="/releases/fieldberry-v14-exe-133.exe">Download exe</a>`);
});

// Marketplace webhook — THIS MAKES YOU HOST
app.post('/api/github/webhook', (req,res)=>{
  console.log('[HOST] Event:', req.headers['x-github-event'], 'Action:', req.body.action);
  res.status(200).json({ok:true, plan:14948, event:req.headers['x-github-event']});
});

// Copilot chat
app.post('/api/copilot/chat', (req,res)=>{
  const last = req.body.messages?.slice(-1)[0]?.content || 'hi';
  res.json({choices:[{message:{role:'assistant', content:`API Sietehr Foundation (Plan 14948): received "${last.slice(0,80)}" — review OK, debug OK, BOM 3 roots`}}]});
});

app.use('/releases', express.static('releases'));

const PORT = process.env.PORT||3000;
app.listen(PORT,'0.0.0.0',()=>console.log('Fieldberry host running plan 14948 on '+PORT));
