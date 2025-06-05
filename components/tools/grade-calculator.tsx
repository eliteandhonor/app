
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Plus, Trash2, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface Assignment {
  id: string;
  name: string;
  grade: string;
  weight: string;
}

export function GradeCalculator() {
  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: '1', name: 'Assignment 1', grade: '', weight: '25' },
    { id: '2', name: 'Assignment 2', grade: '', weight: '25' },
    { id: '3', name: 'Midterm Exam', grade: '', weight: '25' },
    { id: '4', name: 'Final Exam', grade: '', weight: '25' }
  ]);

  const addAssignment = () => {
    const newId = Date.now().toString();
    setAssignments([...assignments, {
      id: newId,
      name: `Assignment ${assignments.length + 1}`,
      grade: '',
      weight: '10'
    }]);
  };

  const removeAssignment = (id: string) => {
    if (assignments.length > 1) {
      setAssignments(assignments.filter(a => a.id !== id));
    }
  };

  const updateAssignment = (id: string, field: keyof Assignment, value: string) => {
    setAssignments(assignments.map(a => 
      a.id === id ? { ...a, [field]: value } : a
    ));
  };

  const calculateGrade = () => {
    const validAssignments = assignments.filter(a => 
      a.grade !== '' && a.weight !== '' && 
      !isNaN(parseFloat(a.grade)) && !isNaN(parseFloat(a.weight))
    );

    if (validAssignments.length === 0) return null;

    const totalWeightedScore = validAssignments.reduce((sum, a) => {
      return sum + (parseFloat(a.grade) * parseFloat(a.weight));
    }, 0);

    const totalWeight = validAssignments.reduce((sum, a) => {
      return sum + parseFloat(a.weight);
    }, 0);

    return totalWeight > 0 ? totalWeightedScore / totalWeight : 0;
  };

  const getLetterGrade = (score: number) => {
    if (score >= 97) return 'A+';
    if (score >= 93) return 'A';
    if (score >= 90) return 'A-';
    if (score >= 87) return 'B+';
    if (score >= 83) return 'B';
    if (score >= 80) return 'B-';
    if (score >= 77) return 'C+';
    if (score >= 73) return 'C';
    if (score >= 70) return 'C-';
    if (score >= 67) return 'D+';
    if (score >= 65) return 'D';
    return 'F';
  };

  const getGPA = (score: number) => {
    if (score >= 97) return 4.0;
    if (score >= 93) return 4.0;
    if (score >= 90) return 3.7;
    if (score >= 87) return 3.3;
    if (score >= 83) return 3.0;
    if (score >= 80) return 2.7;
    if (score >= 77) return 2.3;
    if (score >= 73) return 2.0;
    if (score >= 70) return 1.7;
    if (score >= 67) return 1.3;
    if (score >= 65) return 1.0;
    return 0.0;
  };

  const currentGrade = calculateGrade();
  const totalWeight = assignments.reduce((sum, a) => {
    const weight = parseFloat(a.weight) || 0;
    return sum + weight;
  }, 0);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            Grade Calculator
          </CardTitle>
          <CardDescription>
            Add your assignments and their weights to calculate your overall grade
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            {assignments.map((assignment, index) => (
              <div key={assignment.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                <div className="space-y-2">
                  <Label>Assignment Name</Label>
                  <Input
                    value={assignment.name}
                    onChange={(e) => updateAssignment(assignment.id, 'name', e.target.value)}
                    placeholder="Assignment name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Grade (%)</Label>
                  <Input
                    type="number"
                    value={assignment.grade}
                    onChange={(e) => updateAssignment(assignment.id, 'grade', e.target.value)}
                    placeholder="85"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Weight (%)</Label>
                  <Input
                    type="number"
                    value={assignment.weight}
                    onChange={(e) => updateAssignment(assignment.id, 'weight', e.target.value)}
                    placeholder="25"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeAssignment(assignment.id)}
                    disabled={assignments.length <= 1}
                    className="w-full"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <Button onClick={addAssignment} variant="outline" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Assignment
            </Button>
            <div className="text-sm text-muted-foreground">
              Total Weight: {totalWeight.toFixed(1)}%
              {totalWeight !== 100 && (
                <span className="text-orange-600 ml-2">
                  (Should equal 100%)
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {currentGrade !== null && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                Overall Grade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {currentGrade.toFixed(2)}%
              </div>
              <div className="text-sm text-muted-foreground">
                weighted average
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Letter Grade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">
                {getLetterGrade(currentGrade)}
              </div>
              <div className="text-sm text-muted-foreground">
                letter equivalent
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">GPA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {getGPA(currentGrade).toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">
                4.0 scale
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
