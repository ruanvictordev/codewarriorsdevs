import { useState, useEffect } from "react";
import axios from "axios";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
}

export const useYoutubeVideos = () => {
  const [youtubeVideos, setYoutubeVideos] = useState<Video[]>([]);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchYoutubeVideos = async () => {
      try {
        // Primeira chamada: busca vídeos e transmissões ao vivo
        const searchResponse = await axios.get(
          `https://www.googleapis.com/youtube/v3/search`, 
          {
            params: {
              part: 'snippet',
              channelId: 'UCGrxYTmqKNce5E84Ij0TLvg', // Seu channel ID
              maxResults: 5, // Quantos vídeos você quer carregar
              order: 'date', // Para obter os vídeos mais recentes
              type: 'video', // Apenas vídeos
              key: 'AIzaSyAJTTOxpV5GoKj5m7tshOi6GUSU-ETwFGI', // Sua chave API
            },
          }
        );

        const videoIds = searchResponse.data.items
          .map((item: any) => item.id.videoId)
          .join(',');

        // Segunda chamada: obtendo detalhes dos vídeos
        const detailsResponse = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos`,
          {
            params: {
              part: 'snippet,contentDetails',
              id: videoIds,
              key: 'AIzaSyAJTTOxpV5GoKj5m7tshOi6GUSU-ETwFGI', // Sua chave API
            },
          }
        );

        const videos = detailsResponse.data.items
          .filter((item: any) => {
            const duration = item.contentDetails.duration;
            const isLive = item.liveBroadcastContent === 'live';

            // Verifica a duração maior que 3 minutos (PT3M) ou se é uma transmissão ao vivo
            const isLongerThan3M = duration.includes('PT') && 
              parseInt(duration.match(/(\d+)M/)?.[1] || '0') > 3;

            return isLongerThan3M || isLive;
          })
          .map((item: any) => ({
            id: item.id,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.high.url,
          }));

        setYoutubeVideos(videos);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar vídeos do YouTube:", error);
        setLoading(false);
      }
    };

    fetchYoutubeVideos();
  }, []);

  return {
    youtubeVideos,
    activeVideo,
    setActiveVideo,
    loading,
  };
};
