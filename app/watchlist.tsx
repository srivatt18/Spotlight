import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useSession } from "@/lib/auth-client";
import { theme, text } from "@/lib/styles";

export default function WatchlistPage() {
  const router = useRouter();
  const { data, refetch } = useSession();
  const [mediaList, setMediaList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWatchlist() {
      if (!data?.user) return;

      try {
        const res = await fetch("http://localhost:3000/api/user/watchlist");
        const json = await res.json();
        setMediaList(json);
      } catch (err) {
        console.error("Failed to fetch watchlist:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchWatchlist();
  }, [data]);

  const markAsWatched = async (mediaId: string) => {
    try {
      await fetch("http://localhost:3000/api/user/watched", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mediaId }),
      });

      await refetch(); // Refresh session to get updated watchHistory
    } catch (err) {
      console.error("Failed to mark as watched:", err);
    }
  };

  if (!data?.user) {
    return (
      <View style={theme.container}>
        <Text style={theme.text}>You must be logged in to view your watchlist.</Text>
      </View>
    );
  }

  // ✅ Manual cast to include watchHistory
  const user = data.user as typeof data.user & {
    watchHistory?: string[];
    watchList?: string[];
  };

  return (
    <ScrollView style={{ backgroundColor: "#000" }} contentContainerStyle={theme.container}>
      <Text style={[theme.text, text.xl, { marginBottom: 20 }]}>Your Watchlist</Text>

      {loading ? (
        <ActivityIndicator color="#cf4747" />
      ) : mediaList.length === 0 ? (
        <Text style={theme.text}>No media added yet!</Text>
      ) : (
        mediaList.map((media, i) => {
          const isWatched = user.watchHistory?.includes(media.uuid);
          return (
            <View key={i} style={styles.mediaItem}>
              <Text style={[theme.text, text.md, isWatched && styles.strikethrough]}>
                {media.title}
              </Text>

              {!isWatched && (
                <TouchableOpacity
                  onPress={() => markAsWatched(media.uuid)}
                  style={styles.watchedButton}
                >
                  <Text style={styles.buttonText}>Mark as Watched</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })
      )}

      <TouchableOpacity style={styles.addButton} onPress={() => router.push("/createwatchlist")}>
        <Text style={styles.buttonText}>Add More</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mediaItem: {
    marginBottom: 16,
    alignItems: "center",
  },
  strikethrough: {
    textDecorationLine: "line-through",
    color: "#777",
  },
  watchedButton: {
    backgroundColor: "#2c7a7b",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginTop: 4,
  },
  addButton: {
    backgroundColor: "#cf4747",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 24,
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Monomaniac One",
    fontSize: 16,
    textAlign: "center",
  },
});
