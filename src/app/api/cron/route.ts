import axios from 'axios';
import { NextResponse } from 'next/server';
import { handleAPIError } from '../lib/handleAPIError';
import prisma from '../lib/prisma';
import { apiRes } from '../types';

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

export const GET = async (req: Request, res: NextResponse) =>
  handleAPIError(async () => {
    const assignments = await prisma.assignment.findMany();

    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

    const filteredAssignments = assignments.filter((assignment) => {
      const [datePart, timePart] = assignment.deadLine.split('/');
      const dateTimeString = `${datePart}T${timePart}:00Z`;
      const deadLineDate = new Date(dateTimeString);

      return deadLineDate <= oneHourLater;
    });

    for (const assignment of filteredAssignments) {
      const message = {
        content: `課題「${assignment.title}」の提出期限が迫っています。締切は${assignment.deadLine}です。`,
      };
      if (!DISCORD_WEBHOOK_URL) break;
      await axios.post(DISCORD_WEBHOOK_URL, message);
    }
    return NextResponse.json<apiRes>({ message: 'success', data: assignments }, { status: 200 });
  });
