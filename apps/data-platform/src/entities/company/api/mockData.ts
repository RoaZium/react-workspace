import type { Company } from '../model/types'

export const mockCompanies: Company[] = [
  {
    internalId: 1,
    publicId: 'comp-001',
    code: 'ACME',
    name: 'ACME Corporation',
    description: '글로벌 제조 및 유통 기업',
    isActive: true,
    attributes: {
      businessNumber: '123-45-67890',
      industry: 'Manufacturing',
      size: 'large',
    },
    metadata: {
      address: '서울시 강남구 테헤란로 123',
      ceo: '홍길동',
      contact: {
        name: '김담당',
        email: 'contact@acme.com',
        phone: '02-1234-5678',
      },
      tags: ['제조', '유통', 'B2B'],
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    internalId: 2,
    publicId: 'comp-002',
    code: 'TECH',
    name: 'TechVision Inc.',
    description: 'IT 솔루션 및 클라우드 서비스 제공',
    isActive: true,
    attributes: {
      businessNumber: '234-56-78901',
      industry: 'Technology',
      size: 'medium',
    },
    metadata: {
      address: '서울시 서초구 강남대로 456',
      ceo: '이사장',
      contact: {
        name: '박매니저',
        email: 'info@techvision.com',
        phone: '02-2345-6789',
      },
      tags: ['IT', '클라우드', 'SaaS'],
    },
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-10'),
  },
  {
    internalId: 3,
    publicId: 'comp-003',
    code: 'RETAIL',
    name: 'RetailMart Group',
    description: '대형 유통 체인',
    isActive: true,
    attributes: {
      businessNumber: '345-67-89012',
      industry: 'Retail',
      size: 'enterprise',
    },
    metadata: {
      address: '서울시 송파구 올림픽로 789',
      ceo: '최대표',
      contact: {
        name: '정팀장',
        email: 'support@retailmart.com',
        phone: '02-3456-7890',
      },
      tags: ['유통', '리테일', 'B2C'],
    },
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-05'),
  },
]
