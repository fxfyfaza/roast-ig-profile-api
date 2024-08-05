import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username } = req.body;
    try {
      const url = `https://www.instagram.com/${username}/?__a=1&__d=dis`;
      const response = await axios.get(url);
      const profileData = response.data.graphql.user;

      // Contoh sederhana "roasting"
      const roastMessage = `Hey ${username}, kelihatannya kamu suka banget sama ${profileData.biography || 'tidak ada bio'}`;
      res.status(200).json({ message: roastMessage });
    } catch (error) {
      res.status(500).json({ message: 'Terjadi kesalahan atau akun tidak ditemukan.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
