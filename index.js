// express app boilerplate 

const express = require('express');
const app = express();
const cors = require('cors');
const Joi = require('joi');
const port = process.env.PORT || 3000;
const axios = require('axios');

app.use(express.json());
app.use(cors());

const bodySchema = Joi.object({
  git_repo: Joi.string().required(),
  git_branch: Joi.string().required(),
  namespace: Joi.string().required(),
  project: Joi.string().required(),
  environment: Joi.string().required(),
});

app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

app.post('/el-quarkus', async (req, res) => {
  console.log(`Quarkus request received from remote address: ${req.socket.remoteAddress}`);
  console.log('IP Address:' + req.ip);
  console.log('Body:', req.body);
  const { error } = bodySchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  } else {
    const response = await axios.post('http://ae414b8b890e54cbeb7972e243a93d70-1041701709.us-east-1.elb.amazonaws.com:8080', req.body);
    console.log(response.data);
    console.log('before return');
    return res.json({ message: 'el-quarkus', body: req.body, response: response.data });
  }
});

app.post('/el-springboot', async (req, res) => {
  console.log(`Springboot request received from remote address: ${req.socket.remoteAddress}`);
  console.log('IP Address:' + req.ip);
  console.log('Body:', req.body);
  const { error } = bodySchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  } else {
    const response = await axios.post('http://a8c856d55cf834598b1413fda5143cf0-1816421437.us-east-1.elb.amazonaws.com:8080', req.body);
    console.log(response.data);
    console.log('before return');
    return res.json({ message: 'el-springboot', body: req.body, response: response.data });
  }
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});