
'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FileText, BarChart3, Clock, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export function TextAnalyzer() {
  const [text, setText] = useState('');

  const analysis = useMemo(() => {
    if (!text.trim()) {
      return {
        characters: 0,
        charactersNoSpaces: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0,
        averageWordsPerSentence: 0,
        longestWord: '',
        mostCommonWords: [],
        wordFrequency: {}
      };
    }

    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    
    // Words analysis
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;
    
    // Sentences analysis
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
    const sentenceCount = sentences.length;
    
    // Paragraphs analysis
    const paragraphs = text.split(/\n\s*\n/).filter(para => para.trim().length > 0);
    const paragraphCount = paragraphs.length;
    
    // Reading time (average 200 words per minute)
    const readingTime = Math.ceil(wordCount / 200);
    
    // Average words per sentence
    const averageWordsPerSentence = sentenceCount > 0 ? wordCount / sentenceCount : 0;
    
    // Longest word
    const longestWord = words.reduce((longest, current) => 
      current.length > longest.length ? current : longest, '');
    
    // Word frequency analysis
    const wordFrequency: { [key: string]: number } = {};
    const cleanWords = words.map(word => 
      word.toLowerCase().replace(/[^\w]/g, '')
    ).filter(word => word.length > 2); // Filter out short words
    
    cleanWords.forEach(word => {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    });
    
    // Most common words (top 5)
    const mostCommonWords = Object.entries(wordFrequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([word, count]) => ({ word, count }));

    return {
      characters,
      charactersNoSpaces,
      words: wordCount,
      sentences: sentenceCount,
      paragraphs: paragraphCount,
      readingTime,
      averageWordsPerSentence,
      longestWord,
      mostCommonWords,
      wordFrequency
    };
  }, [text]);

  const clearText = () => {
    setText('');
  };

  const sampleText = () => {
    setText(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Text Analyzer
          </CardTitle>
          <CardDescription>
            Analyze your text for word count, reading time, and statistics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="text">Enter your text</Label>
            <Textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste or type your text here to analyze..."
              rows={10}
              className="resize-none"
            />
          </div>
          
          <div className="flex gap-2">
            <Button onClick={sampleText} variant="outline" size="sm">
              Load Sample Text
            </Button>
            <Button onClick={clearText} variant="outline" size="sm">
              Clear Text
            </Button>
          </div>
        </CardContent>
      </Card>

      {text.trim() && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Characters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {analysis.characters.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  {analysis.charactersNoSpaces.toLocaleString()} without spaces
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Words</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">
                  {analysis.words.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  total words
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Sentences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {analysis.sentences}
                </div>
                <div className="text-sm text-muted-foreground">
                  total sentences
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Paragraphs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {analysis.paragraphs}
                </div>
                <div className="text-sm text-muted-foreground">
                  total paragraphs
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  Reading Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Reading Time:</span>
                  <span className="font-semibold">{analysis.readingTime} min</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg. Words/Sentence:</span>
                  <span className="font-semibold">{analysis.averageWordsPerSentence.toFixed(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Longest Word:</span>
                  <span className="font-semibold font-mono">{analysis.longestWord}</span>
                </div>
                <div className="flex justify-between">
                  <span>Characters/Word:</span>
                  <span className="font-semibold">
                    {analysis.words > 0 ? (analysis.charactersNoSpaces / analysis.words).toFixed(1) : 0}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-primary" />
                  Most Common Words
                </CardTitle>
              </CardHeader>
              <CardContent>
                {analysis.mostCommonWords.length > 0 ? (
                  <div className="space-y-2">
                    {analysis.mostCommonWords.map(({ word, count }, index) => (
                      <div key={word} className="flex justify-between items-center">
                        <span className="font-mono">{word}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{
                                width: `${(count / analysis.mostCommonWords[0].count) * 100}%`
                              }}
                            />
                          </div>
                          <span className="text-sm font-semibold w-8 text-right">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    No common words found (need words longer than 2 characters)
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                Text Readability
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="font-semibold mb-2">Reading Level:</div>
                  <div className="text-muted-foreground">
                    {analysis.averageWordsPerSentence < 15 ? 'Easy' : 
                     analysis.averageWordsPerSentence < 20 ? 'Moderate' : 'Difficult'}
                  </div>
                </div>
                <div>
                  <div className="font-semibold mb-2">Text Density:</div>
                  <div className="text-muted-foreground">
                    {analysis.words / analysis.paragraphs < 50 ? 'Light' :
                     analysis.words / analysis.paragraphs < 100 ? 'Medium' : 'Dense'}
                  </div>
                </div>
                <div>
                  <div className="font-semibold mb-2">Estimated Level:</div>
                  <div className="text-muted-foreground">
                    {analysis.averageWordsPerSentence < 12 ? 'Elementary' :
                     analysis.averageWordsPerSentence < 18 ? 'High School' : 'College'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
