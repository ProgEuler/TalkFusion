import colors from "@/constants/colors";
import { Check, Edit2, Plus, Trash2, X } from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from "react-native";

// --- Types ---
type Tab = "plans" | "create" | "promo";

// --- Components ---

const TabButton = ({ label, isActive, onPress }: { label: string; isActive: boolean; onPress: () => void }) => (
    <TouchableOpacity
        style={[styles.tabButton, isActive && styles.tabButtonActive]}
        onPress={onPress}
    >
        <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{label}</Text>
    </TouchableOpacity>
);

const PlanCard = ({ name, price, features }: { name: string; price: string; features: string[] }) => (
    <View style={styles.planCard}>
        <View style={styles.planHeader}>
            <Text style={styles.planName}>{name}</Text>
            <Text style={styles.planPrice}>{price}<Text style={styles.perMonth}>/month</Text></Text>
        </View>
        <View style={styles.featuresList}>
            {features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                    <Check size={14} color={colors.dark.success} />
                    <Text style={styles.featureText}>{feature}</Text>
                </View>
            ))}
        </View>
        <View style={styles.planActions}>
            <TouchableOpacity style={styles.editPlanButton}>
                <Edit2 size={16} color="white" />
                <Text style={styles.buttonText}>Edit Plan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelPlanButton}>
                <Trash2 size={16} color={colors.dark.danger} />
                <Text style={[styles.buttonText, { color: colors.dark.danger }]}>Cancel Plan</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const PromoCodeItem = ({ code, discount, status }: { code: string; discount: string; status: "Active" | "Expired" }) => (
    <View style={styles.promoItem}>
        <View>
            <View style={styles.promoHeader}>
                <Text style={styles.promoCode}>{code}</Text>
                <View style={[styles.statusBadge, status === "Active" ? styles.statusActive : styles.statusExpired]}>
                    <Text style={styles.statusText}>{status}</Text>
                </View>
            </View>
            <Text style={styles.promoDiscount}>{discount}</Text>
        </View>
        <View style={styles.promoActions}>
            <TouchableOpacity style={styles.iconButton}>
                <Edit2 size={18} color={colors.dark.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
                <X size={18} color={colors.dark.danger} />
            </TouchableOpacity>
        </View>
    </View>
);

export default function SubscriptionPage() {
    const [activeTab, setActiveTab] = useState<Tab>("plans");

    // Form State (Simplified for UI demo)
    const [paymentsEnabled, setPaymentsEnabled] = useState(true);
    const [channelEnabled, setChannelEnabled] = useState(true);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.pageTitle}>Subscription Management</Text>
            </View>

            {/* Tabs */}
            <View style={styles.tabContainer}>
                <TabButton label="Plans" isActive={activeTab === "plans"} onPress={() => setActiveTab("plans")} />
                <TabButton label="Create Plan" isActive={activeTab === "create"} onPress={() => setActiveTab("create")} />
                <TabButton label="Promo Codes" isActive={activeTab === "promo"} onPress={() => setActiveTab("promo")} />
            </View>

            <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>

                {/* --- PLANS TAB --- */}
                {activeTab === "plans" && (
                    <View style={styles.plansContainer}>
                        <PlanCard
                            name="Basic"
                            price="$29"
                            features={["Up to 5 users", "500 AI messages", "Basic analytics", "Email support"]}
                        />
                        <PlanCard
                            name="Pro"
                            price="$99"
                            features={["Unlimited users", "Unlimited AI messages", "Advanced analytics", "24/7 Support", "API Access"]}
                        />
                    </View>
                )}

                {/* --- CREATE PLAN TAB --- */}
                {activeTab === "create" && (
                    <View style={styles.formContainer}>
                        <Text style={styles.sectionTitle}>Plan Details</Text>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Plan Name</Text>
                            <TextInput style={styles.input} placeholder="e.g. Enterprise" placeholderTextColor={colors.dark.textSecondary} />
                        </View>

                        <View style={styles.row}>
                            <View style={[styles.inputGroup, { flex: 1 }]}>
                                <Text style={styles.label}>Price ($)</Text>
                                <TextInput style={styles.input} placeholder="0.00" placeholderTextColor={colors.dark.textSecondary} keyboardType="numeric" />
                            </View>
                            <View style={[styles.inputGroup, { flex: 1 }]}>
                                <Text style={styles.label}>Duration (Days)</Text>
                                <TextInput style={styles.input} placeholder="30" placeholderTextColor={colors.dark.textSecondary} keyboardType="numeric" />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Number of Channels</Text>
                            <TextInput style={styles.input} placeholder="e.g. 5" placeholderTextColor={colors.dark.textSecondary} keyboardType="numeric" />
                        </View>

                        <View style={styles.divider} />

                        <Text style={styles.sectionTitle}>Features & Limits</Text>

                        <View style={styles.switchRow}>
                            <View>
                                <Text style={styles.switchLabel}>Payments</Text>
                                <Text style={styles.switchSubLabel}>Enable payments for this plan</Text>
                            </View>
                            <Switch
                                value={paymentsEnabled}
                                onValueChange={setPaymentsEnabled}
                                trackColor={{ false: colors.dark.border, true: colors.dark.primary }}
                                thumbColor="white"
                            />
                        </View>

                        <View style={styles.switchRow}>
                            <View>
                                <Text style={styles.switchLabel}>Channel Integration</Text>
                                <Text style={styles.switchSubLabel}>Allow 3rd party channels</Text>
                            </View>
                            <Switch
                                value={channelEnabled}
                                onValueChange={setChannelEnabled}
                                trackColor={{ false: colors.dark.border, true: colors.dark.primary }}
                                thumbColor="white"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>API Calls Limit (Monthly)</Text>
                            <TextInput style={styles.input} placeholder="5000" placeholderTextColor={colors.dark.textSecondary} keyboardType="numeric" />
                        </View>

                        <View style={styles.formActions}>
                            <TouchableOpacity style={styles.createButton}>
                                <Text style={styles.createButtonText}>Create Plan</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.resetButton}>
                                <Text style={styles.resetButtonText}>Reset</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {/* --- PROMO CODES TAB --- */}
                {activeTab === "promo" && (
                    <View style={styles.promoContainer}>
                        <View style={styles.createPromoCard}>
                            <Text style={styles.cardTitle}>Create New Promo Code</Text>

                            <View style={styles.inputGroup}>
                                <Text style={styles.label}>Promo Code</Text>
                                <TextInput style={styles.input} placeholder="e.g. WELCOME20" placeholderTextColor={colors.dark.textSecondary} />
                            </View>

                            <View style={styles.row}>
                                <View style={[styles.inputGroup, { flex: 1 }]}>
                                    <Text style={styles.label}>Discount Type</Text>
                                    <View style={styles.fakeSelect}>
                                        <Text style={{ color: colors.dark.text }}>Percentage</Text>
                                    </View>
                                </View>
                                <View style={[styles.inputGroup, { flex: 1 }]}>
                                    <Text style={styles.label}>Value</Text>
                                    <TextInput style={styles.input} placeholder="20" placeholderTextColor={colors.dark.textSecondary} keyboardType="numeric" />
                                </View>
                            </View>

                            <TouchableOpacity style={styles.createButton}>
                                <Plus size={18} color="white" style={{ marginRight: 8 }} />
                                <Text style={styles.createButtonText}>Create Code</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.sectionTitle}>Active Codes</Text>
                        <View style={styles.promoList}>
                            <PromoCodeItem code="WELCOME15" discount="15% Discount" status="Active" />
                            <PromoCodeItem code="ANNUAL20" discount="20% Discount" status="Active" />
                            <PromoCodeItem code="SUMMER50" discount="50% Discount" status="Expired" />
                        </View>
                    </View>
                )}

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.dark.background,
    },
    header: {
        padding: 20,
        paddingBottom: 10,
    },
    pageTitle: {
        fontSize: 20,
        fontWeight: "600",
        color: colors.dark.text,
    },
    tabContainer: {
        flexDirection: "row",
        paddingHorizontal: 20,
        marginBottom: 10,
        gap: 12,
    },
    tabButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: colors.dark.cardBackground,
        borderWidth: 1,
        borderColor: colors.dark.border,
    },
    tabButtonActive: {
        backgroundColor: colors.dark.primary,
        borderColor: colors.dark.primary,
    },
    tabText: {
        color: colors.dark.textSecondary,
        fontWeight: "600",
        fontSize: 14,
    },
    tabTextActive: {
        color: "white",
    },
    content: {
        flex: 1,
    },
    contentContainer: {
        padding: 20,
        paddingTop: 10,
    },
    // Plans Styles
    plansContainer: {
        gap: 20,
    },
    planCard: {
        backgroundColor: colors.dark.cardBackground,
        borderRadius: 16,
        padding: 24,
        borderWidth: 1,
        borderColor: colors.dark.border,
    },
    planHeader: {
        marginBottom: 20,
    },
    planName: {
        fontSize: 18,
        fontWeight: "700",
        color: "white",
        marginBottom: 4,
    },
    planPrice: {
        fontSize: 32,
        fontWeight: "700",
        color: colors.dark.primary,
    },
    perMonth: {
        fontSize: 14,
        color: colors.dark.textSecondary,
        fontWeight: "400",
    },
    featuresList: {
        gap: 12,
        marginBottom: 24,
    },
    featureItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    featureText: {
        color: colors.dark.text,
        fontSize: 14,
    },
    planActions: {
        gap: 12,
    },
    editPlanButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.dark.primary,
        paddingVertical: 12,
        borderRadius: 8,
        gap: 8,
    },
    cancelPlanButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: colors.dark.danger,
        paddingVertical: 12,
        borderRadius: 8,
        gap: 8,
    },
    buttonText: {
        color: "white",
        fontWeight: "600",
        fontSize: 14,
    },
    // Form Styles
    formContainer: {
        backgroundColor: colors.dark.cardBackground,
        borderRadius: 16,
        padding: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "white",
        marginBottom: 16,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        color: colors.dark.textSecondary,
        marginBottom: 8,
    },
    input: {
        backgroundColor: colors.dark.background,
        borderWidth: 1,
        borderColor: colors.dark.border,
        borderRadius: 8,
        padding: 12,
        color: "white",
        fontSize: 14,
    },
    row: {
        flexDirection: "row",
        gap: 16,
    },
    divider: {
        height: 1,
        backgroundColor: colors.dark.border,
        marginVertical: 20,
    },
    switchRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
        backgroundColor: colors.dark.background,
        padding: 12,
        borderRadius: 8,
    },
    switchLabel: {
        fontSize: 14,
        fontWeight: "600",
        color: "white",
    },
    switchSubLabel: {
        fontSize: 12,
        color: colors.dark.textSecondary,
    },
    formActions: {
        flexDirection: "row",
        gap: 12,
        marginTop: 8,
    },
    createButton: {
        flex: 2,
        flexDirection: "row",
        backgroundColor: colors.dark.primary,
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    createButtonText: {
        color: "white",
        fontWeight: "600",
        fontSize: 14,
    },
    resetButton: {
        flex: 1,
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: colors.dark.textSecondary,
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    resetButtonText: {
        color: colors.dark.textSecondary,
        fontWeight: "600",
    },
    // Promo Styles
    promoContainer: {
        gap: 24,
    },
    createPromoCard: {
        backgroundColor: colors.dark.cardBackground,
        borderRadius: 16,
        padding: 20,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "white",
        marginBottom: 20,
    },
    fakeSelect: {
        backgroundColor: colors.dark.background,
        borderWidth: 1,
        borderColor: colors.dark.border,
        borderRadius: 8,
        padding: 12,
        justifyContent: "center",
    },
    promoList: {
        gap: 12,
    },
    promoItem: {
        backgroundColor: colors.dark.cardBackground,
        borderRadius: 12,
        padding: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.dark.border,
    },
    promoHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 4,
    },
    promoCode: {
        fontSize: 16,
        fontWeight: "700",
        color: "white",
    },
    statusBadge: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    statusActive: {
        backgroundColor: "rgba(16, 185, 129, 0.2)",
    },
    statusExpired: {
        backgroundColor: "rgba(239, 68, 68, 0.2)",
    },
    statusText: {
        fontSize: 10,
        fontWeight: "600",
        color: "white", // Overridden by specific colors usually, but white works on dark
    },
    promoDiscount: {
        fontSize: 12,
        color: colors.dark.textSecondary,
    },
    promoActions: {
        flexDirection: "row",
        gap: 12,
    },
    iconButton: {
        padding: 8,
        backgroundColor: colors.dark.background,
        borderRadius: 8,
    },
});
