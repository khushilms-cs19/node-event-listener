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
});

app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

app.post('/el-quarkus', async (req, res) => {
  console.log(`Quarkus request received from remote address: ${req.socket.remoteAddress}`);
  console.log('IP Address:' + req.ip);
  console.log('Body:' + req.body);
  const { error } = bodySchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  } else {
    const response = await axios.post('http://a1c26ff7931e246a7b44b9670d3e81d7-458380765.us-east-1.elb.amazonaws.com:8080', req.body);
    console.log(response.data);
    console.log('before return');
    return res.json({ message: 'el-quarkus', body: req.body, response: response.data });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});