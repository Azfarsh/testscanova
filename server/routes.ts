import type { Express } from "express";
import { createServer, type Server } from "http";
import uploadRouter from "../server/controllers/file-upload-controller";
import { storage } from "./storage";
import { z } from "zod";
import { insertUserSchema, insertMedicalRecordSchema, insertScreeningResultSchema, insertAppointmentSchema, insertChatMessageSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication endpoints
  app.post('/api/auth/register', async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.json({ success: true, user });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Invalid user data', error: (error as Error).message });
    }
  });
  app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    next();
  });
 
  
  
  app.use('/upload', uploadRouter);

  app.post('/api/auth/login', async (req, res) => {
    try {
      const { username, password } = z.object({
        username: z.string(),
        password: z.string()
      }).parse(req.body);
      
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
      
      res.json({ success: true, user });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Invalid request', error: (error as Error).message });
    }
  });
  
  // User endpoints
  app.get('/api/users/:id', async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      
      res.json({ success: true, user });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error', error: (error as Error).message });
    }
  });
  
  // Medical Records endpoints
  app.get('/api/records/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const records = await storage.getMedicalRecordsByUserId(userId);
      res.json({ success: true, records });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error', error: (error as Error).message });
    }
  });
  
  app.post('/api/records', async (req, res) => {
    try {
      const recordData = insertMedicalRecordSchema.parse(req.body);
      const record = await storage.createMedicalRecord(recordData);
      res.json({ success: true, record });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Invalid record data', error: (error as Error).message });
    }
  });
  
  app.delete('/api/records/:id', async (req, res) => {
    try {
      const recordId = parseInt(req.params.id);
      await storage.deleteMedicalRecord(recordId);
      res.json({ success: true, message: 'Record deleted' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error', error: (error as Error).message });
    }
  });
  
  // Screening Results endpoints
  app.get('/api/screening-results/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const results = await storage.getScreeningResultsByUserId(userId);
      res.json({ success: true, results });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error', error: (error as Error).message });
    }
  });
  
  app.post('/api/screening-results', async (req, res) => {
    try {
      const resultData = insertScreeningResultSchema.parse(req.body);
      const result = await storage.createScreeningResult(resultData);
      res.json({ success: true, result });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Invalid result data', error: (error as Error).message });
    }
  });
  
  // Appointments endpoints
  app.get('/api/appointments/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const appointments = await storage.getAppointmentsByUserId(userId);
      res.json({ success: true, appointments });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error', error: (error as Error).message });
    }
  });
  
  app.post('/api/appointments', async (req, res) => {
    try {
      const appointmentData = insertAppointmentSchema.parse(req.body);
      const appointment = await storage.createAppointment(appointmentData);
      res.json({ success: true, appointment });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Invalid appointment data', error: (error as Error).message });
    }
  });
  
  app.patch('/api/appointments/:id', async (req, res) => {
    try {
      const appointmentId = parseInt(req.params.id);
      const updateData = z.object({
        status: z.string().optional(),
        notes: z.string().optional(),
      }).parse(req.body);
      
      const appointment = await storage.updateAppointment(appointmentId, updateData);
      res.json({ success: true, appointment });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Invalid update data', error: (error as Error).message });
    }
  });
  
  // Chat Messages endpoints
  app.get('/api/chat-messages/:userId', async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const messages = await storage.getChatMessagesByUserId(userId);
      res.json({ success: true, messages });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error', error: (error as Error).message });
    }
  });
  
  app.post('/api/chat-messages', async (req, res) => {
    try {
      const messageData = insertChatMessageSchema.parse(req.body);
      const message = await storage.createChatMessage(messageData);
      res.json({ success: true, message });
    } catch (error) {
      res.status(400).json({ success: false, message: 'Invalid message data', error: (error as Error).message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
