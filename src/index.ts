import { createServer } from 'http';
import { config } from 'dotenv';
import { Paths } from './shared/types';
import { addUser, deleteUser, getAllUsers, getUser, updateUser } from './controllers/index';
config();

const PORT = process.env.PORT || 3000;

const server = createServer((req, res) => {
  if (req.method === 'GET' && req.url === Paths.USERS) {
    getAllUsers(req, res);
  } else if (req.method === 'GET' && req.url?.startsWith(Paths.USERS)) {
    getUser(req, res);
  } else if (req.method === 'POST' && req.url === Paths.USERS) {
    addUser(req, res);
  } else if (req.method === 'PUT' && req.url?.startsWith(Paths.USERS)) {
    updateUser(req, res);
  } else if (req.method === 'DELETE' && req.url?.startsWith(Paths.USERS)) {
    deleteUser(req, res);
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
