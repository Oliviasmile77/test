---
name: Custom Grouping (Flex View)
status: open
created: 2026-02-12T18:31:10Z
updated: 2026-02-12T18:31:10Z
github: [Will be updated when synced to GitHub]
depends_on: []
parallel: true
conflicts_with: []
---

# Task: Custom Grouping (Flex View)

## Description
Implement custom grouping functionality in the Positions page (Flex View) that allows users to organize positions by account, symbol type, or custom criteria, with mobile parity to ensure consistent experience across platforms. Users should be able to create, save, and switch between different grouping configurations.

## Acceptance Criteria
- [ ] Users can group positions by account, symbol type, or custom tags
- [ ] Grouping UI includes collapsible sections with group totals
- [ ] Users can save multiple grouping configurations
- [ ] Grouping preferences persist across sessions
- [ ] Mobile version matches desktop functionality and UX
- [ ] Group totals calculate P&L, value, and quantity correctly
- [ ] Users can expand/collapse all groups with single action

## Technical Details
- Add grouping selector to Positions page header
- Implement group calculation logic for P&L aggregation
- Create collapsible group components with expand/collapse animations
- Store grouping preferences in user settings (database)
- Build mobile-responsive layout matching desktop behavior
- Key files: `src/pages/Positions/`, `src/components/PositionGroup/`, `src/api/userSettings/`
- Consider using local storage as fallback if API call fails
- Ensure grouping logic handles edge cases (positions with no account, null values)

## Dependencies
- [ ] No dependencies - independent Positions page feature

## Effort Estimate
- Size: M
- Hours: 16-24 hours
- Parallel: true

## Definition of Done
- [ ] Code implemented
- [ ] Tests written and passing
- [ ] Documentation updated
- [ ] Code reviewed
- [ ] Deployed to staging
