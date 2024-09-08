import express, { NextFunction, Request, Response } from 'express';
import type { Data as XataData } from '../xata';
import { StatusCodes } from 'http-status-codes';
import * as db from '../database/data.db';
export const dataRouter = express.Router();
dataRouter.get('/data', async (req: Request, res: Response) => {
	try {
		const data = await db.getData();
		if (!data) {
			res.status(StatusCodes.NOT_FOUND).send('No datas found');
		}
		return res.status(StatusCodes.OK).json(data);
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
	}
});
dataRouter.post('/data', async (req: Request, res: Response) => {
	try {
		const data = db.setData(req.body as XataData)
		if (!data) {
			res.status(StatusCodes.NOT_FOUND).send('No datas found');
		}
		return res.status(StatusCodes.OK).json(data);
	} catch (error) {
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
	}
});