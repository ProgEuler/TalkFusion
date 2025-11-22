import colors from "@/constants/colors";
import { Calendar, ChevronDown, Save } from "lucide-react-native";
import React from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const CompanyCard = ({ name, status }: { name: string; status: "Active" | "Inactive" }) => (
    <View style={styles.companyCard}>
        <View style={styles.companyHeader}>
            <View style={styles.companyTitleRow}>
                <View style={styles.diamondIcon} />
                <Text style={styles.companyName}>{name}</Text>
            </View>
            <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{status}</Text>
                <View style={styles.statusDot} />
            </View>
        </View>

        <View style={styles.detailsContainer}>
            <DetailRow label="Billing Contact:" value="" />
            <DetailRow label="Billing Email" value="sarah@techcorp.com" />
            <DetailRow label="VAT Number" value="" />
            <DetailRow label="Join Date" value="" />
            <DetailRow label="Company Address" value="Westheimer Rd. Santa Ana..." />
            <DetailRow label="Invoice" value="" />
            <DetailRow label="Due Amount" value="" />
            <DetailRow label="Total Paid" value="" />
        </View>
    </View>
);

const DetailRow = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
    </View>
);

export default function CompanyProfilePage() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.pageTitle}>All Companies</Text>

            <Text style={styles.sectionTitle}>Subscription Details</Text>

            <View style={styles.formContainer}>
                {/* Company Selector */}
                <View style={styles.dropdownInput}>
                    <Text style={styles.inputText}>TechCorp Inc.</Text>
                    <ChevronDown size={20} color={colors.dark.text} />
                </View>

                {/* Date Inputs */}
                <View style={styles.row}>
                    <View style={styles.dateInputGroup}>
                        <Text style={styles.label}>Trial Start</Text>
                        <View style={styles.dateInput}>
                            <Text style={styles.inputText}>5/7/16</Text>
                            <Calendar size={16} color={colors.dark.textSecondary} />
                        </View>
                    </View>
                    <View style={styles.dateInputGroup}>
                        <Text style={styles.label}>Trial End</Text>
                        <View style={styles.dateInput}>
                            <Text style={styles.inputText}>5/7/19</Text>
                            <Calendar size={16} color={colors.dark.textSecondary} />
                        </View>
                    </View>
                </View>

                {/* Current Plan */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Current Plan</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your plan"
                        placeholderTextColor={colors.dark.textSecondary}
                    />
                </View>

                {/* Billing Cycle */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Billing Cycle</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="monthly"
                        placeholderTextColor={colors.dark.textSecondary}
                    />
                </View>

                {/* Renewal & Seats */}
                <View style={styles.row}>
                    <View style={[styles.inputGroup, { flex: 1 }]}>
                        <Text style={styles.label}>Renewal Date</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="20 March, 2023"
                            placeholderTextColor={colors.dark.textSecondary}
                        />
                    </View>
                    <View style={[styles.inputGroup, { flex: 1 }]}>
                        <Text style={styles.label}>Seats / Users</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="25/50"
                            placeholderTextColor={colors.dark.textSecondary}
                        />
                    </View>
                </View>

                {/* Custom Price */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Custom Price</Text>
                    <View style={styles.priceInputContainer}>
                        <Text style={styles.pricePrefix}>$133.00</Text>
                    </View>
                </View>

                {/* Discounts */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Discounts & Coupons</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Coupon code"
                        placeholderTextColor={colors.dark.textSecondary}
                    />
                    <Text style={styles.helperText}>15% annual discount applied</Text>
                </View>

                {/* Save Button */}
                <TouchableOpacity style={styles.saveButton}>
                    <Save size={18} color="white" />
                    <Text style={styles.saveButtonText}>Save change</Text>
                </TouchableOpacity>
            </View>

            {/* Filters */}
            <View style={styles.filtersRow}>
                <View style={styles.filterDropdown}>
                    <Text style={styles.filterText}>All status</Text>
                    <ChevronDown size={14} color={colors.dark.textSecondary} />
                </View>
                <View style={styles.filterDropdown}>
                    <Text style={styles.filterText}>All Plan</Text>
                    <ChevronDown size={14} color={colors.dark.textSecondary} />
                </View>
                <View style={styles.searchInputContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Company name here"
                        placeholderTextColor={colors.dark.textSecondary}
                    />
                </View>
            </View>

            {/* Company List */}
            <View style={styles.listContainer}>
                <CompanyCard name="TechCorp Inc." status="Active" />
                <CompanyCard name="TechCorp Inc." status="Active" />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.dark.background,
    },
    contentContainer: {
        padding: 20,
    },
    pageTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: colors.dark.text,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "white",
        marginBottom: 12,
    },
    formContainer: {
        marginBottom: 32,
    },
    dropdownInput: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.dark.background, // Or slightly lighter if needed
        borderWidth: 1,
        borderColor: colors.dark.border,
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    inputText: {
        color: colors.dark.text,
        fontSize: 14,
    },
    row: {
        flexDirection: "row",
        gap: 16,
        marginBottom: 16,
    },
    dateInputGroup: {
        flex: 1,
    },
    label: {
        fontSize: 12,
        color: colors.dark.textSecondary,
        marginBottom: 6,
        fontWeight: "500",
    },
    dateInput: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.dark.background,
        borderWidth: 1,
        borderColor: colors.dark.border,
        borderRadius: 8,
        padding: 10,
    },
    inputGroup: {
        marginBottom: 16,
    },
    input: {
        backgroundColor: colors.dark.cardBackground, // Darker input background
        borderRadius: 8,
        padding: 12,
        color: "white",
        fontSize: 14,
    },
    priceInputContainer: {
        backgroundColor: colors.dark.cardBackground,
        borderRadius: 8,
        padding: 12,
    },
    pricePrefix: {
        color: colors.dark.textSecondary,
        fontSize: 14,
    },
    helperText: {
        fontSize: 12,
        color: colors.dark.primary,
        marginTop: 4,
    },
    saveButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.dark.primary,
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignSelf: "flex-start",
        gap: 8,
        marginTop: 8,
    },
    saveButtonText: {
        color: "white",
        fontWeight: "600",
        fontSize: 14,
    },
    filtersRow: {
        flexDirection: "row",
        gap: 12,
        marginBottom: 16,
        alignItems: "center",
    },
    filterDropdown: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        borderWidth: 1,
        borderColor: colors.dark.border,
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 6,
    },
    filterText: {
        fontSize: 12,
        color: colors.dark.textSecondary,
    },
    searchInputContainer: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.dark.border,
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 2, // Smaller height for filter row
    },
    searchInput: {
        fontSize: 12,
        color: colors.dark.text,
        height: 32,
    },
    listContainer: {
        gap: 16,
    },
    companyCard: {
        backgroundColor: colors.dark.cardBackground,
        borderRadius: 12,
        padding: 16,
    },
    companyHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.dark.border,
    },
    companyTitleRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    diamondIcon: {
        width: 8,
        height: 8,
        transform: [{ rotate: "45deg" }],
        backgroundColor: colors.dark.textSecondary,
        borderWidth: 1,
        borderColor: "white",
    },
    companyName: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.dark.text,
    },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 12,
        gap: 4,
    },
    statusText: {
        fontSize: 10,
        color: colors.dark.success,
        fontWeight: "600",
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.dark.success,
    },
    detailsContainer: {
        gap: 8,
    },
    detailRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 4,
        borderBottomWidth: 1,
        borderBottomColor: "rgba(255,255,255,0.05)",
    },
    detailLabel: {
        fontSize: 12,
        color: colors.dark.textSecondary,
    },
    detailValue: {
        fontSize: 12,
        color: colors.dark.text,
        textAlign: "right",
        maxWidth: "60%",
    },
});
