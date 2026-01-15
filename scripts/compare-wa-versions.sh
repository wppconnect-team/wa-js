#!/bin/bash
# Compare WhatsApp Web source between two versions
# Usage: ./scripts/compare-wa-versions.sh <version1> <version2> [module_name]
#
# Examples:
#   ./scripts/compare-wa-versions.sh 2.3000.1031980585 2.3000.1031992593
#   ./scripts/compare-wa-versions.sh 2.3000.1031980585 2.3000.1031992593 WAWebUpdateUnreadChatAction

V1="$1"
V2="$2"
MODULE="$3"

WA_SOURCE_DIR="$(dirname "$0")/../wa-source"

if [ -z "$V1" ] || [ -z "$V2" ]; then
    echo "Usage: $0 <version1> <version2> [module_name]"
    echo ""
    echo "Available versions:"
    ls -1 "$WA_SOURCE_DIR" | tail -10
    exit 1
fi

DIR1="$WA_SOURCE_DIR/$V1"
DIR2="$WA_SOURCE_DIR/$V2"

if [ ! -d "$DIR1" ]; then
    echo "Error: Version $V1 not found"
    exit 1
fi

if [ ! -d "$DIR2" ]; then
    echo "Error: Version $V2 not found"
    exit 1
fi

if [ -n "$MODULE" ]; then
    echo "=== Comparing module: $MODULE ==="
    echo ""
    
    # Extract module from both versions
    TMP1=$(mktemp)
    TMP2=$(mktemp)
    
    grep -h "__d(\"$MODULE\"" "$DIR1"/*.js 2>/dev/null | head -1 > "$TMP1"
    grep -h "__d(\"$MODULE\"" "$DIR2"/*.js 2>/dev/null | head -1 > "$TMP2"
    
    if [ ! -s "$TMP1" ]; then
        echo "Module $MODULE not found in $V1"
        rm "$TMP1" "$TMP2"
        exit 1
    fi
    
    if [ ! -s "$TMP2" ]; then
        echo "Module $MODULE not found in $V2"
        rm "$TMP1" "$TMP2"
        exit 1
    fi
    
    # Show diff
    diff --color=always "$TMP1" "$TMP2" || true
    
    rm "$TMP1" "$TMP2"
else
    echo "=== File count comparison ==="
    echo "$V1: $(ls "$DIR1"/*.js 2>/dev/null | wc -l) JS files"
    echo "$V2: $(ls "$DIR2"/*.js 2>/dev/null | wc -l) JS files"
    echo ""
    
    echo "=== Module differences ==="
    # Extract all module names
    TMP1=$(mktemp)
    TMP2=$(mktemp)
    
    grep -oh '__d("[^"]*"' "$DIR1"/*.js 2>/dev/null | sort -u > "$TMP1"
    grep -oh '__d("[^"]*"' "$DIR2"/*.js 2>/dev/null | sort -u > "$TMP2"
    
    echo "Modules only in $V1:"
    comm -23 "$TMP1" "$TMP2" | head -20
    echo ""
    
    echo "Modules only in $V2:"
    comm -13 "$TMP1" "$TMP2" | head -20
    
    rm "$TMP1" "$TMP2"
fi
