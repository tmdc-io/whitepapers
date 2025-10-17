# Vulcan Semantic Validation Guide

**A practical guide to writing valid semantic models, measures, segments, and metrics**

---

## Table of Contents

1. [What This Guide Covers](#what-this-guide-covers)
2. [Quick Start](#quick-start)
3. [Validation Rules](#validation-rules)
   - [Measure Expressions](#measure-expressions)
   - [Segment Filters](#segment-filters)
   - [Join Definitions](#join-definitions)
   - [Metric References](#metric-references)
4. [Common Errors and Solutions](#common-errors-and-solutions)
5. [Best Practices](#best-practices)
6. [Complete Examples](#complete-examples)

---

## What This Guide Covers

When you run `vulcan plan` or start your Vulcan project, all your semantic models are **automatically validated**. This validation catches configuration errors **before** any queries run, helping you catch mistakes early.

**What gets validated:**
- ✅ All column references in measures exist
- ✅ All column references in segments exist
- ✅ Join expressions reference valid columns
- ✅ Cross-model references have valid join paths
- ✅ Metric references point to existing models

**When validation fails:**
- ❌ You'll see detailed error messages with file names and line numbers
- ❌ Vulcan won't start until errors are fixed
- ❌ No queries will run with invalid configurations

---

## Quick Start

### Understanding Semantic Model Structure

**Foundation:** Vulcan models reference physical tables in your database. You can reference them in two ways:
1. **`schema.table`** - Explicit schema qualification (e.g., `raw_data.users`, `analytics.orders`)
2. **`table`** - Just the table name (e.g., `users`, `orders`)

**Aliasing rules:**
- For **`schema.table`** format → alias is **REQUIRED** (use `name:` or `alias:` field)
- For **`table`** format → alias is **optional** (Vulcan uses the table name for semantic purposes)

**Examples:**

```yaml
models:
  # schema.table format - MUST define alias
  raw_data.user_accounts:
    name: users              # ✅ Required: provide consumer-friendly alias
    measures:
      total_users:
        type: count
        expression: COUNT(*)
  
  analytics.dim_customers:
    alias: customers         # ✅ 'name' or 'alias' both work
    measures: ...
  
  # table format - alias is optional
  events:
    # No alias needed - 'events' is already clean
    measures: ...
  
  order_items:
    name: orders             # Optional: override if you want different consumer name
    measures: ...
```

**Key points:**
- **Model key** = physical table reference (`schema.table` or `table`)
- **Alias** = consumer-facing name (hides schemas, prefixes, technical details)
- **In joins and metrics:** always use the alias (or table name if no alias defined)
  - ✅ Reference: `users` (alias)
  - ❌ Not: `raw_data.user_accounts` (physical name)

---

### Semantic Alias Validation Rules

**✅ Valid aliases:**
```yaml
models:
  raw_data.user_accounts:
    name: users                # ✅ Clean consumer name
  
  analytics.dim_subscriptions:
    alias: subscriptions       # ✅ 'name' or 'alias' both work
  
  prod.fact_events_daily:
    name: daily_events         # ✅ Simplified, consumer-friendly
```

**❌ Invalid aliases:**
```yaml
models:
  raw_data.users:
    # ❌ Missing alias - REQUIRED for schema.table format!
    measures: ...
  
  analytics.orders:
    name: analytics.orders     # ❌ Alias cannot contain schema prefix
  
  staging.customers:
    alias: dim-customers       # ❌ Alias cannot contain hyphens
  
  prod.events:
    name: user events          # ❌ Alias cannot contain spaces
```

**Alias requirements:**
1. ✅ **Required** for `schema.table` format (e.g., `raw_data.users`, `analytics.orders`)
2. ✅ Use either `name:` or `alias:` field (both work identically)
3. ✅ Must be alphanumeric with underscores: `users`, `order_items`, `events_v2`
4. ❌ Cannot contain: dots (`.`), hyphens (`-`), spaces, or special characters
5. ✅ Keep it consumer-friendly: hide technical schemas, prefixes, naming conventions

---

### The Golden Rules

1. **All column names must exist** in your data model
2. **Cross-model references require joins** between models
3. **Segments cannot reference other models** (use measures for that)
4. **Join targets use semantic aliases** (the `name:` field)
5. **Metric references use semantic aliases** (the `name:` field)

### Typical Validation Flow

```yaml
# 1. You write your semantic model
models:
  b2b_saas.subscriptions:
    name: subscriptions
    measures:
      total_revenue:
        type: sum
        expression: "amount * 1.1"

# 2. You run vulcan plan
$ vulcan plan

# 3a. If valid → Success! ✅
# 3b. If invalid → Error message with file location ❌
```

---

## Validation Rules

### Measure Expressions

Measures can reference:
- ✅ Columns from the current model
- ✅ Other measures from the current model
- ✅ Columns from joined models (with `model.column` syntax)

#### ✅ Valid Measure Examples

**Simple column reference:**
```yaml
measures:
  total_revenue:
    type: sum
    expression: "amount"  # ✅ 'amount' is a column
```

**Column arithmetic:**
```yaml
measures:
  revenue_with_markup:
    type: sum
    expression: "amount * 1.15"  # ✅ Math on columns
```

**Referencing another measure:**
```yaml
measures:
  base_revenue:
    type: sum
    expression: "amount"
  
  adjusted_revenue:
    type: sum
    expression: "base_revenue * 0.95"  # ✅ Can use other measures
```

**Cross-model reference (requires join):**
```yaml
# In users.yml
models:
  b2b_saas.users:
    name: users
    joins:
      subscriptions:  # Must define join first
        type: one_to_many
        expression: "users.user_id = subscriptions.user_id"
    
    measures:
      revenue_per_user:
        type: sum
        expression: "subscriptions.mrr / total_users"  # ✅ subscriptions.mrr works because join exists
```

**With filters:**
```yaml
measures:
  completed_revenue:
    type: sum
    expression: "amount"
    filters:
      - "status = 'completed'"    # ✅ Filter on columns
      - "amount > 0"              # ✅ Multiple filters
      - "created_at >= '2024-01-01'"  # ✅ Date filters
```

#### ❌ Common Measure Errors

**Error: Column doesn't exist**
```yaml
measures:
  bad_measure:
    type: sum
    expression: "revenue_amount"  # ❌ Typo - column is 'amount' not 'revenue_amount'
```

**Error message:**
```
Model `users` (semantics/users.yml)
measure 'bad_measure' references unknown field 'revenue_amount'
(must be a column or measure in current model)
```

**Fix:** Check your model definition for the correct column name.

---

**Error: Cross-model reference without join**
```yaml
measures:
  user_order_total:
    type: sum
    expression: "subscriptions.mrr"  # ❌ No join defined to 'subscriptions'
```

**Error message:**
```
Model `users` (semantics/users.yml)
measure 'user_order_total' references 'subscriptions.mrr' but no join path exists
```

**Fix:** Add a join definition:
```yaml
joins:
  subscriptions:
    type: one_to_many
    expression: "users.user_id = subscriptions.user_id"
```

---

**Error: Invalid column in cross-model reference**
```yaml
measures:
  user_tax:
    type: sum
    expression: "subscriptions.tax_amount"  # ❌ subscriptions doesn't have 'tax_amount' column
```

**Error message:**
```
Model `users` (semantics/users.yml)
measure 'user_tax' references unknown column 'tax_amount' in model 'subscriptions'
```

**Fix:** Check the subscriptions model for the correct column name (maybe it's `tax` not `tax_amount`).

---

**Error: Invalid filter column**
```yaml
measures:
  active_revenue:
    type: sum
    expression: "mrr"
    filters:
      - "is_active = true"  # ❌ Column 'is_active' doesn't exist
```

**Error message:**
```
Model `subscriptions` (semantics/subscriptions.yml)
measure 'active_revenue' filter references unknown columns: ['is_active']
```

**Fix:** Use the correct column name from your model.

---

### Segment Filters

Segments are **model-scoped** filters - they can only reference columns from the current model.

#### ✅ Valid Segment Examples

**Simple filter:**
```yaml
segments:
  high_value_customers:
    expression: "mrr > 10000"  # ✅ mrr is a column
    description: "High-value accounts"
```

**Multiple conditions:**
```yaml
segments:
  enterprise_segment:
    expression: "plan_type IN ('enterprise', 'business') AND seats > 100"
    description: "Enterprise customers"
    # ✅ Both columns exist
```

**Date-based filter:**
```yaml
segments:
  recent_signups:
    expression: "signup_date >= CURRENT_DATE - INTERVAL '7 days'"
    description: "Users signed up in last 7 days"
    # ✅ Date arithmetic
```

**Complex logic:**
```yaml
segments:
  at_risk_users:
    expression: "(status = 'active' AND plan_type = 'free')"
    description: "Free users who might churn"
    # ✅ Complex boolean logic
```

**Referencing measure-derived dimensions:**
```yaml
dimensions:
  measures_as:
    enterprise_users: enterprise_user_indicator  # Creates dimension from measure

segments:
  enterprise_segment:
    expression: "{enterprise_user_indicator} > 0"
    description: "Enterprise users (using measures_as)"
    # ✅ Can reference measures_as
```

#### ❌ Common Segment Errors

**Error: Column doesn't exist**
```yaml
segments:
  bad_segment:
    expression: "invalid_field > 100"  # ❌ Column doesn't exist
```

**Error message:**
```
Model `users` (semantics/users.yml)
segment 'bad_segment' references unknown identifier 'invalid_field'
```

**Fix:** Check your model definition for the correct column name.

---

**Error: Cross-model reference (not allowed)**
```yaml
segments:
  high_spenders:
    expression: "subscriptions.mrr > 1000"  # ❌ Segments can't reference other models
```

**Error message:**
```
Model `users` (semantics/users.yml)
segment 'high_spenders' references unknown identifier 'subscriptions.mrr'
```

**Fix:** For cross-model logic, use a measure instead:
```yaml
measures:
  total_subscription_mrr:
    type: sum
    expression: "subscriptions.mrr"

segments:
  high_spenders:
    expression: "total_subscription_mrr > 1000"  # ✅ Reference the measure
```

---

### Join Definitions

Joins connect semantic models together, enabling cross-model measures.

#### ✅ Valid Join Examples

**One-to-many join:**
```yaml
# In users.yml
joins:
  subscriptions:        # Name of the target semantic model
    type: one_to_many
    expression: "users.user_id = subscriptions.user_id"
    # ✅ Both columns exist in their respective models
```

**Many-to-one join:**
```yaml
# In usage_events.yml
joins:
  users:
    type: many_to_one
    expression: "usage_events.user_id = users.user_id"
```

**One-to-one join:**
```yaml
# In users.yml
joins:
  user_profiles:
    type: one_to_one
    expression: "users.user_id = user_profiles.user_id"
```

**Complex join condition:**
```yaml
joins:
  subscriptions:
    type: one_to_many
    expression: "users.user_id = subscriptions.user_id AND subscriptions.status = 'active'"
    # ✅ Can include additional conditions
```

#### ❌ Common Join Errors

**Error: Target model doesn't exist**
```yaml
joins:
  nonexistent_model:  # ❌ No semantic model with this name
    type: one_to_many
    expression: "users.id = nonexistent_model.user_id"
```

**Error message:**
```
Model `users` (semantics/users.yml)
references unknown models: 'nonexistent_model'
```

**Fix:** Either:
1. Create the target semantic model
2. Use the correct semantic model name (not data model name!)

---

**Error: Invalid column in join expression**
```yaml
joins:
  subscriptions:
    type: one_to_many
    expression: "users.customer_id = subscriptions.user_id"  # ❌ users doesn't have 'customer_id'
```

**Error message:**
```
Model `users` (semantics/users.yml)
join 'subscriptions' references unknown source column 'customer_id'
```

**Fix:** Use the correct column name:
```yaml
expression: "users.user_id = subscriptions.user_id"  # ✅ Correct
```

---

### Metric References

Metrics combine measures and dimensions from semantic models.

#### ✅ Valid Metric Examples

**Simple metric:**
```yaml
metrics:
  - name: monthly_signups
    measure: users.new_signups      # ✅ 'users' semantic model exists
    time: users.signup_date         # ✅ Reference same or different model
    dimensions:
      - users.signup_channel
      - users.plan_type
```

**Cross-model metric:**
```yaml
metrics:
  - name: revenue_by_channel
    measure: orders.total_revenue   # From orders model
    time: orders.order_date
    dimensions:
      - users.signup_channel        # From users model (join must exist)
      - users.industry
```

#### ❌ Common Metric Errors

**Error: Semantic model doesn't exist**
```yaml
metrics:
  - name: bad_metric
    measure: fake_model.some_measure  # ❌ No semantic model named 'fake_model'
    time: users.signup_date
    dimensions: []
```

**Error message:**
```
Semantic Metric `bad_metric` (semantics/metrics.yml)
references unknown models: 'fake_model'
```

**Fix:** Use the correct semantic model name (check your `semantics/` directory).

---

## Common Errors and Solutions

### Common Alias Errors

**Error: Missing alias for schema.table format**
```yaml
models:
  raw_data.user_accounts:
    # ❌ Missing name/alias field
    measures:
      total_users:
        type: count
        expression: COUNT(*)
```

**Error message:**
```
Semantic model 'raw_data.user_accounts' must have a 'name' or 'alias' field
```

**Fix:** Add a consumer-friendly alias:
```yaml
models:
  raw_data.user_accounts:
    name: users  # ✅ Clean alias for consumers
    measures: ...
```

---

**Error: Invalid characters in alias**
```yaml
models:
  analytics.dim_customers:
    name: dim-customers  # ❌ Hyphens not allowed
```

**Error message:**
```
Invalid alias 'dim-customers': must contain only alphanumeric characters and underscores
```

**Fix:** Use underscores, drop technical prefixes:
```yaml
name: customers  # ✅ Clean, consumer-friendly
```

---

### Debugging Checklist

When you get a validation error:

1. **Check the file path** - Error shows which YAML file has the problem
2. **Check the object name** - Error shows which measure/segment/join is invalid
3. **Check alias definition** - `schema.table` format requires `name:` or `alias:` field
4. **Verify column names** - Check your physical table schema for exact column names
5. **Check semantic aliases** - Joins and metrics use aliases (`users`), not physical names (`raw_data.users`)
6. **Verify join paths** - Cross-model measures require join definitions

### Validation Error Format

```
Model `<semantic_model_name>` (<file_path>)
<object_type> '<object_name>' <specific_error_message>
```

**Example:**
```
Model `users` (semantics/users.yml)
measure 'total_revenue' references unknown field 'amount_total'
```

**How to fix:**
1. Open `semantics/users.yml`
2. Find the measure named `total_revenue`
3. Check your `users` model for the correct column name
4. Update the measure expression

---

## Best Practices

### 1. Use Consistent Naming

**❌ Bad:**
```yaml
# data model has 'user_id'
# Semantic model references 'userId', 'userid', 'id'
```

**✅ Good:**
```yaml
# Always use exact column names from data model
expression: "user_id"  # Matches data model exactly
```

---

### 2. Define Joins Before Using Cross-Model References

**❌ Bad:**
```yaml
measures:
  - name: revenue_per_user
    expression: "orders.amount / user_count"  # ❌ No join defined

joins:
  - name: orders  # Join defined after measure
    type: one_to_many
    expression: "users.user_id = orders.user_id"
```

**✅ Good:**
```yaml
joins:
  - name: orders  # Define joins first
    type: one_to_many
    expression: "users.user_id = orders.user_id"

measures:
  - name: revenue_per_user
    expression: "orders.amount / user_count"  # ✅ Join already defined
```

---

### 3. Use Semantic Model Names for Joins

**❌ Bad:**
```yaml
joins:
  prod.analytics.subscriptions:  # ❌ This is a fully-qualified table name
    type: one_to_many
    expression: "..."
```

**✅ Good:**
```yaml
# In semantics/subscriptions.yml
models:
  b2b_saas.subscriptions:  # Full qualified name as key
    name: subscriptions    # Semantic alias

# In semantics/users.yml
models:
  b2b_saas.users:
    name: users
    joins:
      subscriptions:  # ✅ Use semantic alias, not table name
        type: one_to_many
        expression: "users.user_id = subscriptions.user_id"
```

---

### 4. Keep Segments Model-Scoped

**❌ Bad:**
```yaml
segments:
  - name: high_order_customers
    expression: "orders.total_amount > 1000"  # ❌ Cross-model reference
```

**✅ Good:**
```yaml
# Create a measure first
measures:
  - name: total_order_amount
    type: sum
    expression: "orders.amount"

# Then reference it in segment
segments:
  - name: high_order_customers
    expression: "total_order_amount > 1000"  # ✅ Model-scoped
```

---

### 5. Test Incrementally

**❌ Bad:**
```yaml
# Write 50 measures, 20 segments, 10 joins all at once
# Run vulcan plan → 100 validation errors
```

**✅ Good:**
```yaml
# Add 1-2 measures
# Run vulcan plan → Fix any errors
# Add more measures
# Run vulcan plan → Fix any errors
# Continue incrementally
```

---

## Complete Examples

### Example 1: Simple Semantic Model

```yaml
# semantics/subscriptions.yml
models:
  b2b_saas.subscriptions:
    name: subscriptions
    
    measures:
      total_mrr:
        type: sum
        expression: mrr
        filters:
          - "status = 'active'"
        format: currency
        description: "Total Monthly Recurring Revenue"
      
      subscription_count:
        type: count
        expression: COUNT(*)
        filters:
          - "status = 'active'"
        description: "Total active subscriptions"
      
      churn_count:
        type: count
        expression: COUNT(*)
        filters:
          - "status = 'cancelled'"
          - "end_date >= CURRENT_DATE - INTERVAL '30 days'"
        description: "Subscriptions churned in last 30 days"
    
    segments:
      active_subscriptions:
        expression: "status = 'active'"
        description: "Currently active subscriptions"
      
      high_value_accounts:
        expression: "mrr >= 1000"
        description: "High-value accounts (>= $1000 MRR)"
      
      annual_contracts:
        expression: "billing_cycle = 'annual'"
        description: "Annual billing subscriptions"
    
    dimensions:
      includes:
        - start_date
        - end_date
        - plan_type
        - status
        - billing_cycle
```

**Validation:** ✅ All passes
- ✅ All column references exist in `b2b_saas.subscriptions` model
- ✅ All segments reference same-model columns
- ✅ No cross-model references (no joins needed)

---

### Example 2: Multi-Model with Joins

```yaml
# semantics/users.yml
models:
  b2b_saas.users:
    name: users
    
    measures:
      total_users:
        type: count
        expression: COUNT(*)
        description: "Total registered users"
      
      new_signups:
        type: count
        expression: COUNT(*)
        filters:
          - "signup_date >= CURRENT_DATE - INTERVAL '30 days'"
        description: "New signups in last 30 days"
      
      enterprise_users:
        type: count
        expression: COUNT(*)
        filters:
          - "plan_type = 'enterprise'"
        description: "Enterprise plan users"
    
    segments:
      high_value_accounts:
        expression: "plan_type IN ('pro', 'enterprise')"
        description: "Paid plan users"
      
      recent_signups:
        expression: "signup_date >= CURRENT_DATE - INTERVAL '7 days'"
        description: "Users signed up in last 7 days"
      
      at_risk_users:
        expression: "status = 'active' AND plan_type = 'free'"
        description: "Free users who might churn"
    
    joins:
      subscriptions:
        type: one_to_many
        expression: "users.user_id = subscriptions.user_id"
    
    dimensions:
      includes:
        - signup_date
        - plan_type
        - status
        - company_size
        - signup_channel
        - industry
```

```yaml
# semantics/usage_events.yml
models:
  b2b_saas.usage_events:
    name: usage_events
    
    measures:
      total_events:
        type: count
        expression: COUNT(*)
        description: "Total product usage events"
      
      daily_active_users:
        type: count_distinct
        expression: "user_id"
        filters:
          - "event_date = CURRENT_DATE"
        description: "Unique users active today"
      
      api_usage_count:
        type: sum
        expression: "event_count"
        filters:
          - "event_type = 'api_call'"
        description: "Total API calls made"
    
    segments:
      recent_activity:
        expression: "event_date >= CURRENT_DATE - INTERVAL '7 days'"
        description: "Recent user activity"
      
      api_users:
        expression: "event_type = 'api_call'"
        description: "Users leveraging API integration"
    
    joins:
      users:
        type: many_to_one
        expression: "usage_events.user_id = users.user_id"
    
    dimensions:
      includes:
        - event_date
        - event_type
        - feature_name
        - feature_category
```

**Validation:** ✅ All passes
- ✅ Join from `users` to `subscriptions` defined
- ✅ Join from `usage_events` to `users` defined
- ✅ All filter columns exist
- ✅ All segment expressions valid

---

### Example 3: Metrics

```yaml
# semantics/metrics.yml
metrics:
  monthly_growth:
    measure: users.new_signups
    time: users.signup_date
    dimensions:
      - users.signup_channel
      - users.plan_type
      - users.industry
    description: "Monthly user acquisition by channel, plan, and industry"
  
  revenue_trends:
    measure: subscriptions.total_mrr
    time: subscriptions.start_date
    dimensions:
      - subscriptions.plan_type
      - users.company_size
      - subscriptions.billing_cycle
    description: "MRR growth trends by plan type and company size"
    # Note: Combines dimensions from users and subscriptions (requires join)
  
  product_engagement:
    measure: usage_events.daily_active_users
    time: usage_events.event_date
    dimensions:
      - usage_events.feature_name
      - users.plan_type
    description: "Daily active users by feature and subscription plan"
  
  churn_analysis:
    measure: subscriptions.churn_count
    time: subscriptions.end_date
    dimensions:
      - subscriptions.plan_type
      - users.company_size
      - users.signup_channel
    description: "Churn patterns by plan, company size, and acquisition channel"
```

**Validation:** ✅ All passes
- ✅ All semantic models (`users`, `subscriptions`, `usage_events`) exist
- ✅ Metrics combine dimensions from different models (via joins)
- ✅ Measure/time/dimension references use semantic model names (aliases)

---

## Quick Reference Card

### What Can Reference What?

| From | Can Reference | Syntax | Requires Join? |
|------|---------------|--------|----------------|
| **Measure filter** | Same-model columns | `column_name` | No |
| **Measure expression** | Same-model columns | `column_name` | No |
| **Measure expression** | Same-model measures | `measure_name` | No |
| **Measure expression** | Other-model columns | `model.column_name` | Yes |
| **Segment** | Same-model columns | `column_name` | No |
| **Segment** | Measures_as dimensions | `dim_name` | No |
| **Join** | Both model columns | `model.column_name` | N/A |
| **Metric** | Any model measure/dims | `model.field_name` | Depends |

### Error Keywords to Solutions

| Error Contains | What to Check | Solution |
|----------------|---------------|----------|
| "unknown field" | Column name spelling | Check data model for exact column name |
| "unknown column" | Column name in cross-ref | Check target model for column |
| "unknown identifier" | Segment column ref | Check same-model columns only |
| "unknown models" | Semantic model name | Check `semantics/` directory for model name |
| "no join path" | Missing join definition | Add join in source model |
| "filter references" | Filter column name | Check column exists in model |

---

## Need Help?

**Common issues:**
1. Column name typos → Check data model SQL
2. Wrong model name → Check semantic model names in your `semantics/` directory
3. Missing joins → Define join before using cross-model references
4. Segment cross-model refs → Use measures instead

**Debugging steps:**
1. Read the error message carefully (shows file + object name)
2. Check the referenced column/model exists
3. For cross-model refs, verify join is defined
4. Test changes incrementally with `vulcan plan`

---

**Last Updated:** October 2025
