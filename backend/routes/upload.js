import express from 'express';
import { uploadDriverDocs, uploadUMKMDocs } from '../middleware/upload.js';
import { uploadDriverDocuments, uploadUMKMDocuments } from '../controllers/uploadController.js';

const router = express.Router();

// POST /api/upload/driver - Upload dokumen driver
router.post('/driver', uploadDriverDocs, uploadDriverDocuments);

// POST /api/upload/umkm - Upload dokumen UMKM
router.post('/umkm', uploadUMKMDocs, uploadUMKMDocuments);

export default router;

