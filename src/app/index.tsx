import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { colors } from "@/theme";

const primaryPalette = [
  { name: "charcoal", className: "bg-charcoal" },
  { name: "forest", className: "bg-forest" },
  { name: "grass", className: "bg-grass" },
  { name: "lime", className: "bg-lime" },
] as const;

const rolePalette = [
  { name: "action", className: "bg-action" },
  { name: "on-action", className: "bg-on-action" },
  { name: "success", className: "bg-success" },
  { name: "highlight", className: "bg-highlight" },
] as const;

const typeScale = [
  { label: "H1 / text-h1", className: "text-h1 text-text-primary" },
  { label: "H2 / text-h2", className: "text-h2 text-text-primary" },
  { label: "H3 / text-h3", className: "text-h3 text-text-primary" },
  { label: "H4 / text-h4", className: "text-h4 text-text-primary" },
  { label: "Body LG / text-body-lg", className: "text-body-lg text-text-primary" },
  { label: "Body MD / text-body-md", className: "text-body-md text-text-primary" },
  { label: "Body SM / text-body-sm", className: "text-body-sm text-text-primary" },
  { label: "Caption / text-caption", className: "text-caption text-text-secondary" },
] as const;

function Swatch({ name, className }: { name: string; className: string }) {
  return (
    <View className="items-center gap-1">
      <View className={`h-14 w-14 rounded-xl border border-border ${className}`} />
      <Text className="text-caption text-text-secondary">{name}</Text>
    </View>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View className="gap-3">
      <Text className="text-h3 text-text-primary">{title}</Text>
      {children}
    </View>
  );
}

export default function Index() {
  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={styles.content}
    >
      <Text className="text-h1 text-text-primary">Do</Text>
      <Text className="text-body-md text-text-secondary">
        Design system playground — try a color, a type role, a radius, or a
        shadow, then check it here.
      </Text>

      <Section title="Primary palette">
        <View className="flex-row gap-4">
          {primaryPalette.map((c) => (
            <Swatch key={c.name} {...c} />
          ))}
        </View>
      </Section>

      <Section title="UI roles">
        <View className="flex-row gap-4">
          {rolePalette.map((c) => (
            <Swatch key={c.name} {...c} />
          ))}
        </View>
      </Section>

      <Section title="Type scale">
        <View className="gap-2">
          {typeScale.map((t) => (
            <Text key={t.label} className={t.className}>
              {t.label}
            </Text>
          ))}
        </View>
      </Section>

      <Section title="Buttons (action color, radius variants)">
        <View className="gap-3">
          <TouchableOpacity className="items-center rounded-full bg-action px-6 py-3" activeOpacity={0.8}>
            <Text className="text-body-md font-poppins-semibold text-on-action">
              Filled — rounded-full
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="items-center rounded-xl bg-action px-6 py-3" activeOpacity={0.8}>
            <Text className="text-body-md font-poppins-semibold text-on-action">
              Filled — rounded-xl
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center rounded-xl border-2 border-action px-6 py-3"
            activeOpacity={0.6}
          >
            <Text className="text-body-md font-poppins-semibold text-action">
              Outline
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="items-center rounded-xl px-6 py-3" activeOpacity={0.5}>
            <Text className="text-body-md font-poppins-semibold text-text-secondary">
              Ghost
            </Text>
          </TouchableOpacity>
        </View>
      </Section>

      <Section title="Card (surface + border + shadow)">
        <View className="rounded-2xl border border-border bg-surface p-4" style={styles.cardShadow}>
          <Text className="text-h4 text-text-primary">Trivia Night</Text>
          <Text className="text-body-sm text-text-secondary">
            Thu, 7:00 PM · 4 of 6 spots filled
          </Text>
        </View>
      </Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    gap: 32,
    paddingHorizontal: 24,
    paddingVertical: 64,
  },
  cardShadow: {
    shadowColor: colors.charcoal,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
});
