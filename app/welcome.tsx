import { BlurView } from 'expo-blur';
import { useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import Animatied, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeOut,
  SlideInUp,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EVENTS } from '~/constants';

const AnimatedPressable = Animatied.createAnimatedComponent(Pressable);
export default function WelcomeScreen() {
  const [activeIndex, setActiveIndex] = useState(0);

  function onPressHandler() {
    setActiveIndex((activeIndex) => (activeIndex >= EVENTS.length - 1 ? 0 : activeIndex + 1));
    console.log({ activeIndex });
  }
  return (
    <View className="flex-1 items-center bg-yellow-950">
      {/* marquee */}
      {/* blur effect */}
      <Animatied.Image
        key={activeIndex}
        source={EVENTS[activeIndex].image}
        className="absolute inset-0"
        resizeMode="cover"
        entering={FadeIn.springify().damping(30).mass(1)}
        exiting={FadeOut.duration(1000)}
      />
      {/* for white screen */}
      <View className="absolute inset-0 bg-black/60" />

      <BlurView intensity={20} experimentalBlurMethod="dimezisBlurView">
        <SafeAreaView>
          <Animatied.View entering={SlideInUp.duration(1500)} className="h-3/5 w-full ">
            <ScrollView horizontal>
              {EVENTS.map((event) => (
                <View key={event.id} className="h-full w-96 p-5 shadow-lg">
                  <Image source={event.image} className="h-full w-full rounded-3xl" />
                </View>
              ))}
            </ScrollView>
          </Animatied.View>
          {/* details */}
          <View className="flex-1 justify-center gap-4 p-4 ">
            <Animatied.Text
              entering={FadeInDown.duration(1500).delay(500)}
              className="text-center text-2xl font-bold text-white/60">
              Welcome to
            </Animatied.Text>
            <Animatied.Text
              entering={FadeInDown.duration(1500)}
              className="text-center text-5xl font-bold text-white">
              not just Invite
            </Animatied.Text>
            <Animatied.Text
              entering={FadeInDown.duration(1500).delay(500)}
              className="mb-5 text-center text-lg text-white/60">
              Create beautiful invitation for your events. Anyone can recive invitations.
            </Animatied.Text>
            <AnimatedPressable
              entering={FadeInDown.duration(1500).delay(500)}
              onPress={onPressHandler}
              className="items-center self-center rounded-full bg-white px-10 py-4">
              <Text className=" text-lg">Create an Event</Text>
            </AnimatedPressable>
          </View>
        </SafeAreaView>
      </BlurView>
    </View>
  );
}
