"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const promises_1 = require("fs/promises");
const path_1 = require("path");
const uuid_1 = require("uuid");
let UploadService = class UploadService {
    uploadDir = 'uploads';
    async uploadFile(file) {
        console.log('📁 Upload service called with file:', {
            originalname: file.originalname,
            size: file.size,
            mimetype: file.mimetype
        });
        await (0, promises_1.mkdir)(this.uploadDir, { recursive: true });
        const filename = `${(0, uuid_1.v4)()}-${file.originalname}`;
        const filepath = (0, path_1.join)(this.uploadDir, filename);
        console.log('📁 Writing file to:', filepath);
        await (0, promises_1.writeFile)(filepath, file.buffer);
        const result = {
            url: `/uploads/${filename}`,
            size: file.size,
        };
        console.log('📁 Upload successful, returning:', result);
        return result;
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)()
], UploadService);
//# sourceMappingURL=upload.service.js.map