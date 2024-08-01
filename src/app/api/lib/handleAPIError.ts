import { NextResponse } from 'next/server';
import { apiRes } from '../types';
import prisma from './prisma';

export const handleAPIError = async (
  fn: () => Promise<NextResponse<apiRes>>,
): Promise<NextResponse<apiRes>> => {
  try {
    return await fn();
  } catch (err) {
    console.error('API request failed:', err);
    return NextResponse.json<apiRes>({ message: 'Error', data: err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
