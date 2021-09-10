import { getEndedAuctions } from '../lib/getEndedAuctions';
import { closeAuction } from '../lib/closeAuction';
import createError from 'http-errors';

async function processAuctions(event, context) {
  try {
    const auctionsToClose = await getEndedAuctions();
    const closePromises = auctionsToClose.map(auction => closeAuction(auction))
    await Promise.all(closePromises)
  } catch (error) {
    throw new createError.InternalServerError(error);
  }
}

export const handler = processAuctions;