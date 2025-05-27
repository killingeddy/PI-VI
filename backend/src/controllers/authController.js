const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const JWT_SECRET = process.env.JWT_SECRET || 'seu_segredo_jwt';

class AuthController {
  static async register(req, res) {
    try {
      const { email, password, fullName } = req.body;
      
      // Validação básica
      if (!email || !password || !fullName) {
        return res.status(400).json({
          status: 'error',
          message: 'Todos os campos são obrigatórios'
        });
      }
      
      // Verificar se usuário já existe
      const existingUser = await User.findByEmail(email);
      
      if (existingUser) {
        return res.status(409).json({
          status: 'error',
          message: 'Este email já está em uso'
        });
      }
      
      // Criar novo usuário
      const newUser = await User.create({
        email,
        password,
        full_name: fullName
      });
      
      // Gerar token JWT
      const token = jwt.sign(
        { userId: newUser.id, email: newUser.email },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      // Retornar usuário e token
      res.status(201).json({
        status: 'success',
        message: 'Usuário criado com sucesso',
        data: {
          user: {
            id: newUser.id,
            email: newUser.email,
            name: newUser.full_name
          },
          token
        }
      });
    } catch (error) {
      console.error('Erro no registro:', error);
      res.status(500).json({
        status: 'error',
        message: 'Erro interno no servidor'
      });
    }
  }
  
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({
          status: 'error',
          message: 'Email e senha são obrigatórios'
        });
      }
      
      // Buscar usuário
      const user = await User.findByEmail(email);
      
      if (!user) {
        return res.status(404).json({
          status: 'error',
          message: 'Usuário não encontrado'
        });
      }
      
      // Verificar senha
      const passwordMatch = await bcrypt.compare(password, user.password);
      
      if (!passwordMatch) {
        return res.status(401).json({
          status: 'error',
          message: 'Senha incorreta'
        });
      }
      
      // Gerar token JWT
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      // Retornar usuário e token
      res.json({
        status: 'success',
        message: 'Login realizado com sucesso',
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.full_name
          },
          token
        }
      });
    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({
        status: 'error',
        message: 'Erro interno no servidor'
      });
    }
  }
}

module.exports = AuthController;
