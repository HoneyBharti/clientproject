const { randomUUID } = require('crypto');
const Document = require('../models/Document');
const { uploadToS3 } = require('./s3Client');

const MAX_FILE_BYTES = 15 * 1024 * 1024;

const parseBase64File = (rawValue) => {
  if (!rawValue || typeof rawValue !== 'string') {
    return null;
  }
  const dataUrlMatch = rawValue.match(/^data:.*;base64,(.*)$/);
  const base64 = dataUrlMatch ? dataUrlMatch[1] : rawValue;
  try {
    return Buffer.from(base64, 'base64');
  } catch (error) {
    return null;
  }
};

const sanitizeFileName = (value) =>
  String(value || 'document')
    .trim()
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/_+/g, '_');

const buildS3Key = ({ userId, fileName, source, taxFilingId }) => {
  const safeName = sanitizeFileName(fileName);
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  const sourceFolder = source || 'uploads';
  const scopeFolder = taxFilingId ? `tax-filings/${taxFilingId}` : 'general';

  return `documents/${userId}/${sourceFolder}/${scopeFolder}/${year}/${month}/${Date.now()}_${randomUUID()}_${safeName}`;
};

const storeDocument = async ({ userId, source, status, fileName, mimeType, buffer, uploadedBy, taxFilingId, folder, subfolder, documentType }) => {
  const key = buildS3Key({ userId, fileName, source, taxFilingId });
  const { bucket, region } = await uploadToS3({ buffer, key, contentType: mimeType });

  return Document.create({
    user: userId,
    originalName: fileName,
    mimeType,
    size: buffer.length,
    source,
    status,
    uploadedBy,
    taxFiling: taxFilingId || null,
    storageProvider: 's3',
    s3Bucket: bucket,
    s3Key: key,
    s3Region: region,
    folder: folder || 'KYC',
    subfolder,
    documentType,
  });
};

module.exports = {
  MAX_FILE_BYTES,
  parseBase64File,
  storeDocument,
};
