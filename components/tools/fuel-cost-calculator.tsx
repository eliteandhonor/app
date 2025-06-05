
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Fuel, MapPin, Calculator } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function FuelCostCalculator() {
  const [distance, setDistance] = useState('');
  const [fuelEfficiency, setFuelEfficiency] = useState('');
  const [fuelPrice, setFuelPrice] = useState('');
  const [efficiencyUnit, setEfficiencyUnit] = useState('mpg');
  const [distanceUnit, setDistanceUnit] = useState('miles');

  const calculateFuelCost = () => {
    const dist = parseFloat(distance);
    const efficiency = parseFloat(fuelEfficiency);
    const price = parseFloat(fuelPrice);
    
    if (isNaN(dist) || isNaN(efficiency) || isNaN(price) || efficiency === 0) return null;
    
    // Convert to consistent units (miles and mpg)
    let distanceInMiles = dist;
    let efficiencyInMpg = efficiency;
    
    if (distanceUnit === 'km') {
      distanceInMiles = dist * 0.621371;
    }
    
    if (efficiencyUnit === 'l100km') {
      // Convert L/100km to MPG
      efficiencyInMpg = 235.214 / efficiency;
    } else if (efficiencyUnit === 'kmpl') {
      // Convert km/L to MPG
      efficiencyInMpg = efficiency * 2.35214;
    }
    
    const gallonsNeeded = distanceInMiles / efficiencyInMpg;
    const totalCost = gallonsNeeded * price;
    
    return {
      gallonsNeeded: gallonsNeeded.toFixed(2),
      totalCost: totalCost.toFixed(2),
      costPerMile: (totalCost / distanceInMiles).toFixed(3),
      costPerKm: (totalCost / (distanceInMiles * 1.60934)).toFixed(3)
    };
  };

  const result = calculateFuelCost();

  const presetTrips = [
    { name: 'City Commute', distance: 25, unit: 'miles' },
    { name: 'Weekend Trip', distance: 150, unit: 'miles' },
    { name: 'Road Trip', distance: 500, unit: 'miles' },
    { name: 'Cross Country', distance: 2500, unit: 'miles' }
  ];

  const commonEfficiencies = [
    { name: 'Compact Car', mpg: 32 },
    { name: 'Sedan', mpg: 28 },
    { name: 'SUV', mpg: 24 },
    { name: 'Truck', mpg: 20 },
    { name: 'Hybrid', mpg: 45 },
    { name: 'Electric (equiv)', mpg: 100 }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Fuel className="h-5 w-5 text-primary" />
            Fuel Cost Calculator
          </CardTitle>
          <CardDescription>
            Calculate fuel costs for trips based on distance and fuel efficiency
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="distance">Distance</Label>
                <div className="flex gap-2">
                  <Input
                    id="distance"
                    type="number"
                    placeholder="100"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={distanceUnit} onValueChange={setDistanceUnit}>
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="miles">Miles</SelectItem>
                      <SelectItem value="km">KM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="efficiency">Fuel Efficiency</Label>
                <div className="flex gap-2">
                  <Input
                    id="efficiency"
                    type="number"
                    placeholder="25"
                    value={fuelEfficiency}
                    onChange={(e) => setFuelEfficiency(e.target.value)}
                    className="flex-1"
                  />
                  <Select value={efficiencyUnit} onValueChange={setEfficiencyUnit}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mpg">MPG</SelectItem>
                      <SelectItem value="l100km">L/100km</SelectItem>
                      <SelectItem value="kmpl">KM/L</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fuel-price">Fuel Price ($ per gallon)</Label>
                <Input
                  id="fuel-price"
                  type="number"
                  step="0.01"
                  placeholder="3.50"
                  value={fuelPrice}
                  onChange={(e) => setFuelPrice(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <Card className="bg-primary/5">
                    <CardContent className="pt-6">
                      <div className="text-center space-y-2">
                        <div className="text-sm text-muted-foreground">Total Fuel Cost</div>
                        <div className="text-3xl font-bold text-primary">
                          ${result.totalCost}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-muted/50">
                    <CardContent className="pt-6 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Fuel Needed:</span>
                        <span className="font-medium">{result.gallonsNeeded} gallons</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cost per Mile:</span>
                        <span className="font-medium">${result.costPerMile}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cost per KM:</span>
                        <span className="font-medium">${result.costPerKm}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Preset Trips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {presetTrips.map((trip) => (
                <Button
                  key={trip.name}
                  variant="outline"
                  onClick={() => {
                    setDistance(trip.distance.toString());
                    setDistanceUnit(trip.unit);
                  }}
                  className="w-full justify-between"
                >
                  <span>{trip.name}</span>
                  <span className="text-muted-foreground">
                    {trip.distance} {trip.unit}
                  </span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-4 w-4 text-primary" />
              Vehicle Types
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {commonEfficiencies.map((vehicle) => (
                <Button
                  key={vehicle.name}
                  variant="outline"
                  onClick={() => {
                    setFuelEfficiency(vehicle.mpg.toString());
                    setEfficiencyUnit('mpg');
                  }}
                  className="w-full justify-between"
                >
                  <span>{vehicle.name}</span>
                  <span className="text-muted-foreground">
                    {vehicle.mpg} MPG
                  </span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
