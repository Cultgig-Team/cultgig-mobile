import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Pressable,
  Animated,
  TextInput,
} from "react-native";
import { theme } from "../../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Button } from "../../components/atoms";
import { Search, ListFilter, X, Check } from "lucide-react-native";
import { Input } from "../../components/atoms/Input/";
import { useState, useRef, useCallback, useEffect } from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import { useArtistSearch } from "../../hooks/useArtworks";
import { ArtistProfileCard } from "../../components/molecules/ArtistProfileCard";
import { MainTabParamList } from "../../navigation/types";

const CATEGORIES: { key: string; label: string; image: number }[] = [
  {
    key: "photographer",
    label: "Photographer",
    image: require("../../../assets/onboarding/categories/Photographer.png"),
  },
  {
    key: "dancer",
    label: "Dancer",
    image: require("../../../assets/onboarding/categories/Dancer.png"),
  },
  {
    key: "guitarist",
    label: "Guitarist",
    image: require("../../../assets/onboarding/categories/Guitarist.png"),
  },
  {
    key: "painter",
    label: "Painter",
    image: require("../../../assets/onboarding/categories/Painter.png"),
  },
  {
    key: "comedian",
    label: "Comedian",
    image: require("../../../assets/onboarding/categories/Comedian.png"),
  },
  {
    key: "videographer",
    label: "Videographer",
    image: require("../../../assets/onboarding/categories/Videographer.png"),
  },
];

const LOCATIONS = [
  "West Bengal",
  "Mumbai",
  "Andhra Pradesh",
  "Assam",
  "Bihar",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Bangalore",
  "Hyderabad",
  "Kerala",
  "Chennai",
];

const GENDERS = ["Male", "Female"];

// ─── Search Screen ──────────────────────────────────────────────────────────

export const SearchScreen = () => {
  const AVATAR_URL = "https://randomuser.me/api/portraits/men/32.jpg";
  const route = useRoute<RouteProp<MainTabParamList, "Search">>();

  const [searchText, setSearchText] = useState(route.params?.query ?? "");
  const [activeCategory, setActiveCategory] = useState(
    route.params?.category ?? ""
  );

  // Sync state when route params change (e.g. from HomeScreen)
  useEffect(() => {
    if (route.params?.category !== undefined) {
      setActiveCategory(route.params.category);
    }
    if (route.params?.query !== undefined) {
      setSearchText(route.params.query);
    }
  }, [route.params?.category, route.params?.query]);

  // Applied Filter States
  const [appliedLocation, setAppliedLocation] = useState("");
  const [appliedMinPrice, setAppliedMinPrice] = useState("");
  const [appliedMaxPrice, setAppliedMaxPrice] = useState("");
  const [appliedGender, setAppliedGender] = useState("");

  // Temporary (in-modal) Filter States
  const [tempLocation, setTempLocation] = useState("");
  const [tempMinPrice, setTempMinPrice] = useState("");
  const [tempMaxPrice, setTempMaxPrice] = useState("");
  const [tempGender, setTempGender] = useState("");

  const [filterVisible, setFilterVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(600)).current;

  // Determine if active filters count > 0
  const activeFilterCount =
    (appliedLocation ? 1 : 0) +
    (appliedGender ? 1 : 0) +
    (appliedMinPrice || appliedMaxPrice ? 1 : 0);

  // Determine if we are in "search/filter mode"
  const isSearching =
    searchText.length > 0 ||
    activeCategory.length > 0 ||
    appliedLocation.length > 0 ||
    appliedGender.length > 0 ||
    appliedMinPrice.length > 0 ||
    appliedMaxPrice.length > 0;

  const { data: artists, isLoading } = useArtistSearch({
    query: searchText,
    category: activeCategory,
    location: appliedLocation,
    gender: appliedGender,
    minPrice: appliedMinPrice,
    maxPrice: appliedMaxPrice,
  });

  const openFilter = () => {
    setTempLocation(appliedLocation);
    setTempMinPrice(appliedMinPrice);
    setTempMaxPrice(appliedMaxPrice);
    setTempGender(appliedGender);
    setFilterVisible(true);
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 80,
      friction: 12,
    }).start();
  };

  const closeFilter = () => {
    Animated.timing(slideAnim, {
      toValue: 600,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setFilterVisible(false));
  };

  const handleApplyFilters = () => {
    setAppliedLocation(tempLocation);
    setAppliedMinPrice(tempMinPrice);
    setAppliedMaxPrice(tempMaxPrice);
    setAppliedGender(tempGender);
    closeFilter();
  };

  const handleResetFilters = () => {
    setTempLocation("");
    setTempMinPrice("");
    setTempMaxPrice("");
    setTempGender("");
  };

  const handleCategoryPress = useCallback((key: string) => {
    setActiveCategory((prev) => (prev === key ? "" : key));
  }, []);

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
      {/* Top header */}
      <View style={styles.topHeader}>
        <TouchableOpacity style={styles.bellButton}>
          <Text variant="h1" color="primary">
            Search
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={{ uri: AVATAR_URL }} style={styles.avatar} />
        </TouchableOpacity>
      </View>

      {/* Search Header Container (Fixed at top outside ScrollView) */}
      <View style={styles.searchHeaderContainer}>
        <View style={styles.searchRow}>
          <View style={styles.searchInputWrapper}>
            <Search size={20} color={theme.colors.textSecondary} />
            <Input
              placeholder="Search for artists, skills, genres.."
              style={styles.searchInput}
              value={searchText}
              onChangeText={setSearchText}
            />
            {searchText.length > 0 && (
              <TouchableOpacity
                onPress={() => setSearchText("")}
                style={styles.clearButton}
                activeOpacity={0.7}
              >
                <X size={18} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            )}
          </View>

          {/* Filter icon button — outside the box to the right */}
          <TouchableOpacity
            onPress={openFilter}
            style={[
              styles.filterButton,
              activeFilterCount > 0 && styles.filterButtonActive,
            ]}
            activeOpacity={0.7}
          >
            <ListFilter
              size={32}
              color={
                activeFilterCount > 0
                  ? theme.colors.textInverse
                  : theme.colors.primary
              }
            />
            {activeFilterCount > 0 && (
              <View style={styles.filterBadge}>
                <Text variant="bodySmall" style={styles.filterBadgeText}>
                  {activeFilterCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Active filter chips (dismiss on tap) */}
        {(activeCategory.length > 0 ||
          appliedLocation.length > 0 ||
          appliedGender.length > 0 ||
          appliedMinPrice.length > 0 ||
          appliedMaxPrice.length > 0) && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.activePillsContainer}
          >
            {activeCategory.length > 0 && (
              <TouchableOpacity
                style={styles.activePill}
                onPress={() => setActiveCategory("")}
                activeOpacity={0.8}
              >
                <Text variant="bodySmall" style={styles.activePillText}>
                  {CATEGORIES.find((c) => c.key === activeCategory)?.label}
                </Text>
                <X size={12} color={theme.colors.primary} />
              </TouchableOpacity>
            )}

            {appliedLocation.length > 0 && (
              <TouchableOpacity
                style={styles.activePill}
                onPress={() => setAppliedLocation("")}
                activeOpacity={0.8}
              >
                <Text variant="bodySmall" style={styles.activePillText}>
                  {appliedLocation}
                </Text>
                <X size={12} color={theme.colors.primary} />
              </TouchableOpacity>
            )}

            {appliedGender.length > 0 && (
              <TouchableOpacity
                style={styles.activePill}
                onPress={() => setAppliedGender("")}
                activeOpacity={0.8}
              >
                <Text variant="bodySmall" style={styles.activePillText}>
                  {appliedGender}
                </Text>
                <X size={12} color={theme.colors.primary} />
              </TouchableOpacity>
            )}

            {(appliedMinPrice.length > 0 || appliedMaxPrice.length > 0) && (
              <TouchableOpacity
                style={styles.activePill}
                onPress={() => {
                  setAppliedMinPrice("");
                  setAppliedMaxPrice("");
                }}
                activeOpacity={0.8}
              >
                <Text variant="bodySmall" style={styles.activePillText}>
                  ₹{appliedMinPrice || "0"} - ₹{appliedMaxPrice || "Any"}
                </Text>
                <X size={12} color={theme.colors.primary} />
              </TouchableOpacity>
            )}
          </ScrollView>
        )}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Search / category results ── */}
        {isSearching ? (
          <View>
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color={theme.colors.primary} size="large" />
                <Text
                  variant="bodySmall"
                  color="textSecondary"
                  style={{ marginTop: 8 }}
                >
                  Finding artists…
                </Text>
              </View>
            ) : artists && artists.length > 0 ? (
              <>
                <Text
                  variant="bodySmall"
                  color="textSecondary"
                  style={styles.resultCount}
                >
                  {artists.length} artist{artists.length !== 1 ? "s" : ""} found
                </Text>
                {artists.map((artist) => (
                  <ArtistProfileCard key={artist.id} artist={artist} />
                ))}
              </>
            ) : (
              <View style={styles.emptyContainer}>
                <Image source={require("../../../assets/not-found.png")} />
                <Text variant="h3" style={{ marginBottom: 6 }}>
                  No artists found
                </Text>
                <Text
                  variant="bodySmall"
                  color="textSecondary"
                  style={{ textAlign: "center" }}
                >
                  Try a different name, category, location, or filter.
                </Text>
              </View>
            )}
          </View>
        ) : (
          /* ── Default: category grid ── */
          <View>
            <Text variant="h2" style={{ marginVertical: 20 }}>
              Top Artist categories
            </Text>
            <View style={styles.grid}>
              {CATEGORIES.map((category) => {
                const isActive = activeCategory === category.key;
                return (
                  <TouchableOpacity
                    key={category.key}
                    style={[
                      styles.categoryItem,
                      isActive && styles.categoryItemActive,
                    ]}
                    onPress={() => handleCategoryPress(category.key)}
                    activeOpacity={0.8}
                  >
                    <Image
                      source={category.image}
                      style={styles.categoryImage}
                    />
                    {isActive && <View style={styles.categoryOverlay} />}
                    <Text
                      variant="bodySmall"
                      style={[
                        styles.categoryLabel,
                        isActive && styles.categoryLabelActive,
                      ]}
                    >
                      {category.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Filter Bottom Sheet Modal */}
      <Modal
        visible={filterVisible}
        transparent
        animationType="none"
        onRequestClose={closeFilter}
        statusBarTranslucent
      >
        <Pressable style={styles.modalOverlay} onPress={closeFilter}>
          <Animated.View
            style={[
              styles.bottomSheet,
              { transform: [{ translateY: slideAnim }] },
            ]}
          >
            {/* Prevent backdrop click from dismissing inside card */}
            <Pressable style={styles.sheetInner}>
              {/* Handle bar */}
              <View style={styles.handleBar} />

              {/* Header */}
              <View style={styles.sheetHeader}>
                <Text variant="h2">Filters</Text>
                <TouchableOpacity
                  onPress={closeFilter}
                  style={styles.closeButton}
                  activeOpacity={0.7}
                >
                  <X size={20} color={theme.colors.textPrimary} />
                </TouchableOpacity>
              </View>

              {/* Filter Form Content */}
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.sheetBody}
                contentContainerStyle={styles.sheetBodyContent}
              >
                {/* 1. Location Section */}
                <View style={styles.filterSection}>
                  <Text variant="h3" style={styles.filterSectionTitle}>
                    Location
                  </Text>
                  <View style={styles.filterVerticalList}>
                    {LOCATIONS.map((loc, index) => {
                      const isSelected = tempLocation === loc;
                      return (
                        <TouchableOpacity
                          key={loc}
                          style={[
                            styles.filterListItem,
                            index === LOCATIONS.length - 1 &&
                              styles.filterListItemLast,
                          ]}
                          onPress={() =>
                            setTempLocation((prev) => (prev === loc ? "" : loc))
                          }
                          activeOpacity={0.7}
                        >
                          <Text
                            variant="bodySmall"
                            style={[
                              styles.filterItemLabel,
                              isSelected && styles.filterItemLabelSelected,
                            ]}
                          >
                            {loc}
                          </Text>
                          <View
                            style={[
                              styles.checkbox,
                              isSelected && styles.checkboxSelected,
                            ]}
                          >
                            {isSelected && (
                              <Check
                                size={14}
                                color={theme.colors.textInverse}
                                strokeWidth={3}
                              />
                            )}
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                {/* 2. Price Range Section */}
                <View style={styles.filterSection}>
                  <Text variant="h3" style={styles.filterSectionTitle}>
                    Price Range
                  </Text>
                  <View style={styles.priceRow}>
                    <View style={styles.priceCol}>
                      <Text
                        variant="bodySmall"
                        color="textSecondary"
                        style={styles.priceSubLabel}
                      >
                        Min
                      </Text>
                      <View style={styles.priceInputBox}>
                        <Text
                          variant="bodySmall"
                          color="textSecondary"
                          style={styles.currencyPrefix}
                        >
                          INR₹
                        </Text>
                        <TextInput
                          style={styles.priceTextInput}
                          placeholder="Any"
                          placeholderTextColor={theme.colors.textDisabled}
                          keyboardType="numeric"
                          value={tempMinPrice}
                          onChangeText={setTempMinPrice}
                        />
                      </View>
                    </View>

                    <Text style={styles.priceHyphen}>-</Text>

                    <View style={styles.priceCol}>
                      <Text
                        variant="bodySmall"
                        color="textSecondary"
                        style={styles.priceSubLabel}
                      >
                        Max
                      </Text>
                      <View style={styles.priceInputBox}>
                        <Text
                          variant="bodySmall"
                          color="textSecondary"
                          style={styles.currencyPrefix}
                        >
                          INR₹
                        </Text>
                        <TextInput
                          style={styles.priceTextInput}
                          placeholder="Any"
                          placeholderTextColor={theme.colors.textDisabled}
                          keyboardType="numeric"
                          value={tempMaxPrice}
                          onChangeText={setTempMaxPrice}
                        />
                      </View>
                    </View>
                  </View>
                </View>

                {/* 3. Gender Section */}
                <View style={styles.filterSection}>
                  <Text variant="h3" style={styles.filterSectionTitle}>
                    Gender
                  </Text>
                  <View style={styles.filterVerticalList}>
                    {GENDERS.map((g, index) => {
                      const isSelected = tempGender === g;
                      return (
                        <TouchableOpacity
                          key={g}
                          style={[
                            styles.filterListItem,
                            index === GENDERS.length - 1 &&
                              styles.filterListItemLast,
                          ]}
                          onPress={() =>
                            setTempGender((prev) => (prev === g ? "" : g))
                          }
                          activeOpacity={0.7}
                        >
                          <Text
                            variant="bodySmall"
                            style={[
                              styles.filterItemLabel,
                              isSelected && styles.filterItemLabelSelected,
                            ]}
                          >
                            {g}
                          </Text>
                          <View
                            style={[
                              styles.checkbox,
                              isSelected && styles.checkboxSelected,
                            ]}
                          >
                            {isSelected && (
                              <Check
                                size={14}
                                color={theme.colors.textInverse}
                                strokeWidth={3}
                              />
                            )}
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              </ScrollView>

              {/* Bottom Actions */}
              <View style={styles.modalFooter}>
                <Button
                  label="Reset"
                  variant="outline"
                  size="md"
                  style={styles.resetButton}
                  onPress={handleResetFilters}
                />
                <Button
                  label="Apply Filters"
                  variant="primary"
                  size="md"
                  style={styles.applyButton}
                  onPress={handleApplyFilters}
                />
              </View>
            </Pressable>
          </Animated.View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  topHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  bellButton: {
    padding: 6,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  searchHeaderContainer: {
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
  },
  searchInput: {
    flex: 1,
    borderWidth: 0,
    paddingVertical: 16.5,
    paddingHorizontal: 0,
  },
  clearButton: {
    padding: 4,
  },
  filterButton: {
    // padding: 10,
    // borderRadius: 14,
    // borderWidth: 1,
    // borderColor: theme.colors.border,
    // backgroundColor: theme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  filterButtonActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: theme.colors.accent,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: theme.colors.surface,
  },
  filterBadgeText: {
    color: theme.colors.textInverse,
    fontSize: 10,
    fontWeight: "700",
  },
  activePillsContainer: {
    flexDirection: "row",
    gap: 8,
    paddingVertical: 6,
  },
  activePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: theme.colors.primaryLight,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  activePillText: {
    color: theme.colors.primary,
    fontWeight: "600",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: theme.spacing.md,
  },
  categoryItem: {
    width: "30%",
    borderRadius: 12,
    overflow: "hidden",
  },
  categoryItemActive: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
    borderRadius: 12,
  },
  categoryOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(106, 46, 98, 0.15)",
    borderRadius: 12,
  },
  categoryImage: {
    width: "100%",
    height: 116,
    borderRadius: 12,
  },
  categoryLabel: {
    textAlign: "center",
    paddingTop: 8,
    paddingBottom: 4,
  },
  categoryLabelActive: {
    color: theme.colors.primary,
    fontWeight: "700",
  },
  loadingContainer: {
    alignItems: "center",
    paddingVertical: 60,
  },
  resultCount: {
    marginBottom: 12,
    marginTop: 4,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 60,
  },

  // Modal / Bottom Sheet
  modalOverlay: {
    flex: 1,
    backgroundColor: theme.colors.overlay,
    justifyContent: "flex-end",
  },
  bottomSheet: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: "85%",
  },
  sheetInner: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  handleBar: {
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.border,
    alignSelf: "center",
    marginTop: 12,
    marginBottom: 8,
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  closeButton: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  sheetBody: {
    maxHeight: 400,
  },
  sheetBodyContent: {
    paddingVertical: 16,
    gap: 20,
  },
  filterSection: {
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  filterSectionTitle: {
    fontWeight: "700",
  },
  filterVerticalList: {
    backgroundColor: theme.colors.surface,
  },
  filterListItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomColor: theme.colors.border,
  },
  filterListItemLast: {
    borderBottomWidth: 0,
  },
  filterItemLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: theme.colors.textPrimary,
  },
  filterItemLabelSelected: {
    fontWeight: "700",
    color: theme.colors.primary,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.surface,
  },
  checkboxSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },

  // Price Range Row
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingBottom: 20,
  },
  priceCol: {
    flex: 1,
    gap: 4,
  },
  priceSubLabel: {
    fontSize: 12,
  },
  priceInputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    backgroundColor: theme.colors.backgroundSecondary,
    paddingHorizontal: 10,
  },
  currencyPrefix: {
    fontWeight: "600",
    marginRight: 6,
  },
  priceTextInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    color: theme.colors.textPrimary,
  },
  priceHyphen: {
    alignSelf: "flex-end",
    marginBottom: 12,
    color: theme.colors.textSecondary,
    fontWeight: "700",
  },

  // Modal Footer Buttons
  modalFooter: {
    flexDirection: "row",
    gap: 12,
    paddingTop: 16,
  },
  resetButton: {
    flex: 1,
  },
  applyButton: {
    flex: 2,
  },
});
