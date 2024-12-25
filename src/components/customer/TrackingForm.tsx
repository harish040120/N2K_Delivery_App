import React, { useState } from 'react';
import { Package } from 'lucide-react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { getParcelByTracking } from '../../utils/tracking';

interface TrackingFormProps {
  onTrackingSuccess: (trackingNumber: string) => void;
}

export const TrackingForm: React.FC<TrackingFormProps> = ({ onTrackingSuccess }) => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const parcel = await getParcelByTracking(trackingNumber);
      if (parcel) {
        onTrackingSuccess(trackingNumber);
      } else {
        setError('Invalid tracking number. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <Input
        label="Tracking Number"
        placeholder="Enter your tracking number"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
        icon={<Package className="h-5 w-5 text-gray-400" />}
        error={error}
        required
      />
      <Button
        type="submit"
        className="w-full mt-4"
        loading={loading}
        disabled={!trackingNumber}
      >
        Track Package
      </Button>
    </form>
  );
};