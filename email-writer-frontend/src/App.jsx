// import React, { useState } from 'react';
// import axios from 'axios';
// import { Container, TextField, Typography, Box, FormControl, InputLabel, Select, MenuItem, CircularProgress, Button } from '@mui/material';
// import './App.css';
//
// function App() {
//   const [emailContent, setEmailContent] = useState('');
//   const [tone, setTone] = useState('');
//   const [generatedReply, setGeneratedReply] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//
//   const handleSubmit = async () => {
//     setLoading(true);
//     setError('');
//     try{
//         const response = await axios.post("http://localhost:8080/api/email/generate", {
//             emailContent,
//             tone
//         });
//         setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
//     }catch (error){
//         setError('Failed to generated reply, please try again later.')
//         console.error(error);
//     }finally{
//         setLoading(false);
//     }
//   };
//
//   return (
//     <Container maxWidth="md" sx={{ py: 4 }}>
//       <Typography variant="h3" component="h1" gutterBottom>
//         Email reply generator
//       </Typography>
//       <Box sx={{ mx: 3 }}>
//         <TextField
//           fullWidth
//           multiline
//           rows={6}
//           variant="outlined"
//           label="Original Email Content"
//           value={emailContent || ''}
//           onChange={(e) => setEmailContent(e.target.value)}
//           sx={{ mb: 2 }}
//         />
//         <FormControl fullWidth sx = {{mb :2}}>
//           <InputLabel>Tone (Optional)</InputLabel>
//           <Select
//             value = {tone || ''}
//             label = {"Tone (Optional)"}
//             onChange={(e) => setTone(e.target.value)}>
//               <MenuItem value = "">None</MenuItem>
//               <MenuItem value = "professional">Professional</MenuItem>
//               <MenuItem value = "casual">Casual</MenuItem>
//               <MenuItem value = "friendly">Friendly</MenuItem>
//               <MenuItem value = "biblical">Biblical</MenuItem>
//             </Select>
//         </FormControl>
//         <Button
//           variant = 'contained'
//           onClick = {handleSubmit}
//           disabled = {!emailContent || loading}
//           fullWidth>
//           {loading ? <CircularProgress size={24}/> : "Generate Reply"}
//         </Button>
//       </Box>
//       {error && (
//           <Typography color = 'error' sx = {{mb:2}}>
//               {error}
//           </Typography>
//           )}
//       {generatedReply && (
//         <Box>
//             <Typography variant = 'h6' gutterBottom>Generated Reply</Typography>
//             <TextField
//                 fullWidth
//                 multiline
//                 rows = {6}
//                 variant = 'outlined'
//                 value = {generatedReply || ''}
//                 inputProps = {{readOnly: true}}/>
//                 <Button
//                   variant="outlined"
//                   sx={{ mt: 2 }}
//                   onClick={() => navigator.clipboard.writeText(generatedReply)}>
//                   Copy to clipboard
//                 </Button>
//         </Box>
//       )}
//     </Container>
//   );
// }
//
// export default App;
import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Button,
  Snackbar
} from '@mui/material';
import './App.css';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:8080/api/email/generate', {
        emailContent,
        tone,
      });
      setGeneratedReply(
        typeof response.data === 'string' ? response.data : JSON.stringify(response.data)
      );
    } catch (error) {
      setError('Failed to generate reply, please try again later.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedReply);
    setCopied(true);
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 600, textAlign: 'center' }}>
        Email Reply Generator
      </Typography>

      <Box
        sx={{
          backgroundColor: '#f9f9f9',
          p: 4,
          borderRadius: 4,
          boxShadow: 3,
          mt: 3,
        }}
      >
        <TextField
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          label="Original Email Content"
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{ mb: 3, borderRadius: 2 }}
        />

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Tone (Optional)</InputLabel>
          <Select
            value={tone}
            label="Tone (Optional)"
            onChange={(e) => setTone(e.target.value)}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="professional">Professional</MenuItem>
            <MenuItem value="casual">Casual</MenuItem>
            <MenuItem value="friendly">Friendly</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!emailContent || loading}
          fullWidth
          sx={{
            borderRadius: 3,
            py: 1.5,
            fontWeight: 500,
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1565c0',
            },
          }}
        >
          {loading ? <CircularProgress size={24} /> : 'Generate Reply'}
        </Button>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Box>

      {generatedReply && (
        <Box
          sx={{
            mt: 4,
            backgroundColor: '#f5f5f5',
            p: 3,
            borderRadius: 3,
            boxShadow: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            label="Generated Reply"
            value={generatedReply}
            inputProps={{ readOnly: true }}
            sx={{ borderRadius: 2 }}
          />

          <Button
            variant="outlined"
            onClick={handleCopy}
            sx={{
              mt: 2,
              borderRadius: 3,
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: '#e0e0e0',
              },
            }}
          >
            Copy to Clipboard
          </Button>
        </Box>
      )}

      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={() => setCopied(false)}
        message="Copied to clipboard"
      />
    </Container>
  );
}

export default App;

