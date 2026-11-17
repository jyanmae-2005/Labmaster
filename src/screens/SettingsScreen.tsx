import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { PageTitle } from '../components/PageTitle';
import { Screen } from '../components/Screen';
import { SurfaceCard } from '../components/SurfaceCard';
import { useAppTheme } from '../theme/ThemeProvider';

export function SettingsScreen() {
  const { colors, isDark, toggleTheme } = useAppTheme();
  const [name, setName] = useState('Student');
  const [editingName, setEditingName] = useState(false);

  return (
    <Screen>
      <PageTitle eyebrow="Make it yours" title="Settings" subtitle="Set up Labmaster to feel right for you." />

      <Text style={[styles.sectionLabel, { color: colors.muted }]}>PREFERENCES</Text>
      <SurfaceCard style={styles.settingCard}>
        <View style={[styles.settingIcon, { backgroundColor: colors.primarySoft }]}>
          <Ionicons name={isDark ? 'moon' : 'sunny-outline'} size={19} color={colors.primary} />
        </View>
        <View style={styles.settingCopy}>
          <Text style={[styles.settingTitle, { color: colors.text }]}>Dark appearance</Text>
          <Text style={[styles.settingSubtitle, { color: colors.muted }]}>Apply across your whole app</Text>
        </View>
        <Switch
          accessibilityLabel="Toggle dark appearance"
          value={isDark}
          onValueChange={toggleTheme}
          trackColor={{ false: '#D8E0DA', true: colors.primary }}
          thumbColor="#FFFFFF"
        />
      </SurfaceCard>

      <Text style={[styles.sectionLabel, { color: colors.muted, marginTop: 26 }]}>PROFILE</Text>
      <SurfaceCard style={styles.profileCard}>
        <View style={[styles.profileAvatar, { backgroundColor: colors.primarySoft }]}>
          <Text style={[styles.profileInitial, { color: colors.primary }]}>{name.trim().charAt(0).toUpperCase() || 'S'}</Text>
        </View>
        <View style={styles.profileCopy}>
          <Text style={[styles.settingTitle, { color: colors.text }]}>Your name</Text>
          {editingName ? (
            <TextInput
              accessibilityLabel="Your name"
              value={name}
              onChangeText={setName}
              onSubmitEditing={() => setEditingName(false)}
              onBlur={() => setEditingName(false)}
              autoFocus
              maxLength={24}
              returnKeyType="done"
              style={[styles.nameInput, { color: colors.text, borderBottomColor: colors.border }]}
            />
          ) : (
            <Text style={[styles.settingSubtitle, { color: colors.muted }]}>{name || 'Student'}</Text>
          )}
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={editingName ? 'Done editing name' : 'Edit name'}
          onPress={() => setEditingName((current) => !current)}
          style={styles.editButton}
        >
          <Ionicons name={editingName ? 'checkmark' : 'create-outline'} size={19} color={colors.primary} />
        </Pressable>
      </SurfaceCard>

      <View style={[styles.note, { backgroundColor: colors.primarySoft }]}>
        <Ionicons name="information-circle-outline" size={19} color={colors.primary} />
        <Text style={[styles.noteText, { color: colors.text }]}>
          Your appearance preference is shared across Home, Labs, and Progress.
        </Text>
      </View>

      <Text style={[styles.version, { color: colors.muted }]}>LABMASTER  ·  MOBILE LEARNING  ·  V1.0</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  sectionLabel: { fontSize: 10, letterSpacing: 1.1, fontWeight: '800', marginBottom: 10 },
  settingCard: { flexDirection: 'row', alignItems: 'center', padding: 15 },
  settingIcon: { width: 40, height: 40, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  settingCopy: { flex: 1 },
  settingTitle: { fontSize: 13, fontWeight: '800' },
  settingSubtitle: { fontSize: 11, marginTop: 4 },
  profileCard: { flexDirection: 'row', alignItems: 'center', padding: 15 },
  profileAvatar: { width: 43, height: 43, borderRadius: 15, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  profileInitial: { fontSize: 17, fontWeight: '900' },
  profileCopy: { flex: 1 },
  nameInput: { fontSize: 11, marginTop: 4, paddingVertical: 2, borderBottomWidth: 1 },
  editButton: { padding: 8 },
  note: { flexDirection: 'row', alignItems: 'center', gap: 10, borderRadius: 15, padding: 14, marginTop: 20 },
  noteText: { flex: 1, fontSize: 11, lineHeight: 17 },
  version: { textAlign: 'center', fontSize: 9, fontWeight: '700', letterSpacing: 1, marginTop: 38 },
});
