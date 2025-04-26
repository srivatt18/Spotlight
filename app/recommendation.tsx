import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import MediaTile from '@/lib/components/media_tile';
import { useSession } from '@/lib/auth-client';
import { theme, text, scale, scaleHoz, scaleVert } from '@/lib/styles';
import { MediaType } from '@/lib/validate';
import { useRouter } from 'expo-router';

const router = useRouter()

export default function RecommendationPage() {
  const [recommendations, setRecommendations] = useState<{ recommendations: string[]; length: number }>({
    recommendations: [],
    length: 0,
  });

  let session = useSession().data
  useEffect(() => {
    if (!session) {
      router.push('/auth/login')
    }

    fetch("http://localhost:3000/api/recommendations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "ratings": [{ "movie": "Interstellar", "rating": 50 }, { "movie": "Frozen II", "rating": 100 }] })
    })
      .then((res) => res.json())
      .then(data => {
        console.log("data incoming")
        console.log(data)
        setRecommendations(data)
      })
  }, [])

  return (
    <ScrollView contentContainerStyle={[theme.container, { gap: scaleVert(10) }]}>
      {/* Movies*/}
      <View>
        <Text style={[text.xl, { marginBottom: 20 }]}>Here's some great movies to watch!:</Text>

        <View style={styles.tileGrid}>
          {recommendations.recommendations.map((media, index) => {console.log("Creating component" + media); return (
            <View key={index}>
              <MediaTile title={media} size={scaleHoz(35)} />
            </View>
          )})}
        </View>
      </View>

      <TouchableOpacity>
        <Text style={theme.button}>Generate More Recommendations</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  tileGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
    paddingHorizontal: scaleHoz(15),
    width: '100%',
  },
});