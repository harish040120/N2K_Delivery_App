// Simulated SMS service for local development
export const sendSMS = async (phone: string, message: string) => {
  console.log(`Sending SMS to ${phone}: ${message}`);
  // In production, implement actual SMS service
  return true;
};

export const notifyParcelStatus = async (
  senderPhone: string,
  receiverPhone: string,
  trackingNumber: string,
  status: 'dispatched' | 'delivered'
) => {
  const message = status === 'dispatched'
    ? `Your parcel (${trackingNumber}) has been dispatched and is on its way.`
    : `Your parcel (${trackingNumber}) has been delivered successfully.`;

  await Promise.all([
    sendSMS(senderPhone, message),
    sendSMS(receiverPhone, message)
  ]);
};