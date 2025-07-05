#!/usr/bin/env node
import React, { useState } from 'react';
import { render, Text, Box, useApp } from 'ink';
import TextInput from 'ink-text-input';

const App = () => {
  const [japaneseText, setJapaneseText] = useState('');
  const [englishText, setEnglishText] = useState('');
  const [focusedInput, setFocusedInput] = useState('japanese');
  const { exit } = useApp();

  const handleSubmit = () => {
    if (focusedInput === 'japanese') {
      setFocusedInput('english');
    } else {
      exit();
    }
  };

  return (
    <Box flexDirection="column" padding={1}>
      <Text bold color="cyan">React Ink IME Bug Reproduction</Text>
      <Text color="gray">This demonstrates the IME input issue with Japanese text</Text>
      <Text> </Text>
      
      <Box flexDirection="column">
        <Text color="yellow">Try typing Japanese text (use IME):</Text>
        <Box>
          <Text>Japanese: </Text>
          <TextInput
            value={japaneseText}
            onChange={setJapaneseText}
            onSubmit={handleSubmit}
            focus={focusedInput === 'japanese'}
            placeholder="Type Japanese here..."
          />
        </Box>
      </Box>

      <Text> </Text>

      <Box flexDirection="column">
        <Text color="green">Compare with English text input:</Text>
        <Box>
          <Text>English:  </Text>
          <TextInput
            value={englishText}
            onChange={setEnglishText}
            onSubmit={handleSubmit}
            focus={focusedInput === 'english'}
            placeholder="Type English here..."
          />
        </Box>
      </Box>

      <Text> </Text>
      <Text color="gray">Press Enter to switch between inputs, or Ctrl+C to exit</Text>
      <Text> </Text>
      <Text dim>Current values:</Text>
      <Text>Japanese: "{japaneseText}"</Text>
      <Text>English: "{englishText}"</Text>
    </Box>
  );
};

render(<App />);