# Device360 Data Product Integration with Pydantic AI: Developer Examples

**How Developers Query Device360 Data Product for Specific Device Intelligence using Pydantic AI Framework**

---

## Overview

Device360 data product contains intelligence from **millions of devices** across Lenovo's global fleet. Developers can query specific device information using unique device identifiers, enabling AI agents to access rich contextual data about individual devices while leveraging fleet-wide intelligence patterns.

This document demonstrates how developers integrate Device360's massive device dataset with Pydantic AI to build production-grade AI agents that understand specific device contexts within the broader fleet intelligence.

---

## Device360 Data Product Context

### Scale and Scope
- **Millions of devices** tracked across global enterprise and consumer deployments
- **Real-time telemetry** from active device fleet
- **Historical patterns** spanning multiple device generations and configurations
- **Cross-fleet intelligence** enabling comparative analysis and predictive modeling

### Query Patterns
- **Device-specific queries** using unique device identifiers (device_id, serial_number, asset_tag)
- **Fleet intelligence** leveraging patterns from similar devices
- **Comparative analysis** benchmarking individual devices against fleet performance
- **Predictive modeling** using fleet data to predict individual device behavior

---

## Example 1: Customer Support AI Agent with Device-Specific Intelligence

**Use Case**: AI-powered customer support that queries Device360 for specific device context from millions of tracked devices.

```python
from dataclasses import dataclass
from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field
from pydantic_ai import Agent, RunContext
from device360_client import Device360Client

# Dependencies for accessing Device360 data product
@dataclass
class Device360Dependencies:
    device360_client: Device360Client
    device_id: str  # Unique identifier to query specific device from millions

# Structured output for support recommendations
class DeviceSupportResponse(BaseModel):
    device_id: str = Field(description="Unique device identifier")
    diagnosis: str = Field(description="Technical diagnosis based on device-specific data")
    recommended_actions: List[str] = Field(description="Actions tailored to this specific device")
    escalation_needed: bool = Field(description="Whether to escalate based on device history")
    estimated_resolution_time: str = Field(description="Time estimate based on similar devices in fleet")
    confidence_score: float = Field(description="Confidence based on fleet patterns (0.0-1.0)", ge=0.0, le=1.0)
    fleet_context: str = Field(description="How this device compares to similar devices in fleet")

# Create Device360-powered support agent
device_support_agent = Agent(
    'openai:gpt-4o',
    deps_type=Device360Dependencies,
    result_type=DeviceSupportResponse,
    system_prompt=(
        "You are an expert Lenovo device support AI agent with access to Device360 data product "
        "containing intelligence from millions of devices. When analyzing a specific device, "
        "leverage both the individual device's telemetry/history and patterns from similar "
        "devices across the entire fleet to provide accurate support recommendations."
    )
)

@device_support_agent.system_prompt
async def add_device_context(ctx: RunContext[Device360Dependencies]) -> str:
    """Query Device360 for specific device context from millions of devices."""
    # Query specific device from millions in Device360 data product
    device_profile = await ctx.deps.device360_client.query_device_by_id(
        device_id=ctx.deps.device_id
    )
    
    # Get fleet context for this device type
    fleet_stats = await ctx.deps.device360_client.get_fleet_context(
        device_model=device_profile.model,
        device_age_months=device_profile.age_months,
        usage_pattern=device_profile.usage_classification
    )
    
    context = f"""
    Specific Device Context (ID: {ctx.deps.device_id}):
    - Device: {device_profile.model} (Serial: {device_profile.serial_number})
    - Age: {device_profile.age_months} months
    - Health Score: {device_profile.health_score}/1.0 (Fleet Average: {fleet_stats.avg_health_score})
    - Usage Pattern: {device_profile.usage_classification}
    - Total Runtime Hours: {device_profile.total_runtime_hours}
    - Recent Issues: {device_profile.recent_anomalies}
    - Warranty Status: {device_profile.warranty_status}
    
    Fleet Intelligence Context:
    - Similar devices in fleet: {fleet_stats.similar_device_count:,}
    - This device's performance percentile: {fleet_stats.performance_percentile}th
    - Common issues for this device type: {fleet_stats.common_issues}
    - Success rate for similar issues: {fleet_stats.resolution_success_rate}%
    """
    
    return context

@device_support_agent.tool
async def get_device_telemetry_comparison(
    ctx: RunContext[Device360Dependencies], 
    hours_back: int = 24
) -> dict:
    """Get device telemetry and compare against fleet benchmarks."""
    # Get specific device telemetry
    device_metrics = await ctx.deps.device360_client.get_device_telemetry(
        device_id=ctx.deps.device_id,
        hours_back=hours_back
    )
    
    # Get fleet benchmarks for comparison
    device_profile = await ctx.deps.device360_client.query_device_by_id(ctx.deps.device_id)
    fleet_benchmarks = await ctx.deps.device360_client.get_fleet_benchmarks(
        device_model=device_profile.model,
        usage_classification=device_profile.usage_classification
    )
    
    return {
        "device_metrics": {
            "cpu_usage_avg": device_metrics.cpu_usage_avg,
            "memory_usage_avg": device_metrics.memory_usage_avg,
            "disk_health": device_metrics.disk_health_score,
            "thermal_events": device_metrics.thermal_throttle_events,
            "battery_health": device_metrics.battery_capacity_percentage
        },
        "fleet_comparison": {
            "cpu_percentile": fleet_benchmarks.cpu_usage_percentile(device_metrics.cpu_usage_avg),
            "memory_percentile": fleet_benchmarks.memory_usage_percentile(device_metrics.memory_usage_avg),
            "thermal_performance_vs_fleet": fleet_benchmarks.thermal_performance_comparison(device_metrics.thermal_events),
            "battery_health_vs_peers": fleet_benchmarks.battery_health_comparison(device_metrics.battery_health)
        },
        "fleet_context": {
            "total_similar_devices": fleet_benchmarks.comparison_device_count,
            "performance_ranking": fleet_benchmarks.overall_performance_ranking
        }
    }

@device_support_agent.tool
async def query_similar_device_cases(
    ctx: RunContext[Device360Dependencies],
    issue_description: str
) -> dict:
    """Query Device360 for similar cases across millions of devices."""
    # Get device profile to identify similar devices
    device_profile = await ctx.deps.device360_client.query_device_by_id(ctx.deps.device_id)
    
    # Query similar cases from millions of devices in Device360
    similar_cases = await ctx.deps.device360_client.query_similar_support_cases(
        device_model=device_profile.model,
        device_age_range=(device_profile.age_months - 6, device_profile.age_months + 6),
        usage_pattern=device_profile.usage_classification,
        issue_description=issue_description,
        max_results=50
    )
    
    return {
        "total_devices_searched": similar_cases.total_fleet_devices_searched,
        "matching_cases_found": len(similar_cases.cases),
        "most_successful_solutions": similar_cases.top_solutions,
        "average_resolution_time": similar_cases.avg_resolution_hours,
        "escalation_rate": similar_cases.escalation_percentage,
        "fleet_insights": {
            "affected_device_percentage": similar_cases.fleet_impact_percentage,
            "trending_issue": similar_cases.is_trending_issue,
            "seasonal_pattern": similar_cases.seasonal_correlation
        }
    }

@device_support_agent.tool
async def check_device_advisories_and_updates(
    ctx: RunContext[Device360Dependencies]
) -> dict:
    """Check advisories and updates specific to this device from Device360 intelligence."""
    # Query device-specific advisories from Device360
    device_advisories = await ctx.deps.device360_client.get_device_specific_advisories(
        device_id=ctx.deps.device_id
    )
    
    # Get fleet-wide advisories affecting similar devices
    device_profile = await ctx.deps.device360_client.query_device_by_id(ctx.deps.device_id)
    fleet_advisories = await ctx.deps.device360_client.get_fleet_advisories(
        device_model=device_profile.model,
        firmware_version=device_profile.current_firmware_version,
        hardware_revision=device_profile.hardware_revision
    )
    
    return {
        "device_specific": {
            "pending_updates": device_advisories.available_updates,
            "security_patches": device_advisories.security_updates,
            "driver_updates": device_advisories.driver_recommendations,
            "configuration_optimizations": device_advisories.config_recommendations
        },
        "fleet_intelligence": {
            "devices_affected_by_advisories": fleet_advisories.total_affected_devices,
            "critical_updates_available": fleet_advisories.critical_updates,
            "update_success_rates": fleet_advisories.update_success_statistics,
            "rollback_incidents": fleet_advisories.rollback_rates
        }
    }

# Usage Example
async def handle_support_request():
    """Example of querying specific device from Device360's millions of devices."""
    
    # Initialize Device360 client
    device360_client = Device360Client(
        dataos_endpoint="https://your-dataos-instance.com",
        api_key="your-api-key",
        data_product="device360"
    )
    
    # Query specific device from millions using device ID
    device_id = "LNV_ENT_X1C_001234567"  # Unique identifier in Device360
    
    deps = Device360Dependencies(
        device360_client=device360_client,
        device_id=device_id
    )
    
    # Customer support request
    customer_issue = """
    My ThinkPad X1 Carbon has been experiencing severe performance issues. 
    It overheats during video calls, battery drains in 2 hours instead of 8, 
    and applications frequently freeze. This started about 2 weeks ago.
    """
    
    result = await device_support_agent.run(customer_issue, deps=deps)
    
    print("AI Support Response for Device ID:", device_id)
    print(f"Diagnosis: {result.data.diagnosis}")
    print(f"Fleet Context: {result.data.fleet_context}")
    print(f"Recommended Actions: {', '.join(result.data.recommended_actions)}")
    print(f"Confidence (based on {result.data.fleet_context} similar devices): {result.data.confidence_score}")
```

---

## Example 2: Fleet-Wide Predictive Maintenance with Device-Specific Analysis

**Use Case**: AI agent that analyzes individual devices within the context of millions of devices for predictive maintenance insights.

```python
from enum import Enum
from pydantic import BaseModel, Field
from pydantic_ai import Agent, RunContext
from typing import List, Dict, Optional
from datetime import datetime, timedelta

class FleetRiskLevel(str, Enum):
    FLEET_OUTLIER = "fleet_outlier"  # Device performing worse than 95% of fleet
    ABOVE_FLEET_AVERAGE = "above_fleet_average"
    FLEET_AVERAGE = "fleet_average" 
    BELOW_FLEET_AVERAGE = "below_fleet_average"
    FLEET_TOP_PERFORMER = "fleet_top_performer"  # Top 5% of fleet

class PredictiveMaintenanceResponse(BaseModel):
    device_id: str = Field(description="Unique device identifier")
    fleet_risk_level: FleetRiskLevel = Field(description="Risk level compared to millions of similar devices")
    device_health_score: float = Field(description="Individual device health (0.0-1.0)", ge=0.0, le=1.0)
    fleet_percentile: int = Field(description="Performance percentile within fleet", ge=0, le=100)
    predicted_failure_probability: float = Field(description="30-day failure probability", ge=0.0, le=1.0)
    fleet_comparison_insights: str = Field(description="How device compares to fleet patterns")
    recommended_actions: List[str] = Field(description="Actions based on fleet intelligence")
    similar_devices_analyzed: int = Field(description="Number of similar devices in comparison")

# Create predictive maintenance agent with fleet intelligence
fleet_maintenance_agent = Agent(
    'anthropic:claude-3-5-sonnet-latest',
    deps_type=Device360Dependencies,
    result_type=PredictiveMaintenanceResponse,
    system_prompt=(
        "You are a predictive maintenance AI with access to Device360 data product containing "
        "intelligence from millions of Lenovo devices. For each device analysis, leverage both "
        "the specific device's telemetry and patterns from similar devices across the entire fleet "
        "to provide accurate maintenance predictions and recommendations."
    )
)

@fleet_maintenance_agent.tool
async def analyze_device_vs_fleet_trends(
    ctx: RunContext[Device360Dependencies],
    analysis_days: int = 90
) -> dict:
    """Compare individual device trends against fleet-wide patterns."""
    
    # Get device-specific performance trends
    device_trends = await ctx.deps.device360_client.get_device_performance_trends(
        device_id=ctx.deps.device_id,
        days_back=analysis_days
    )
    
    # Get device profile for fleet comparison
    device_profile = await ctx.deps.device360_client.query_device_by_id(ctx.deps.device_id)
    
    # Query fleet trends for similar devices from millions in Device360
    fleet_trends = await ctx.deps.device360_client.analyze_fleet_performance_trends(
        device_model=device_profile.model,
        age_range_months=(device_profile.age_months - 3, device_profile.age_months + 3),
        usage_pattern=device_profile.usage_classification,
        analysis_period_days=analysis_days
    )
    
    return {
        "device_performance": {
            "thermal_degradation_rate": device_trends.thermal_performance_slope,
            "battery_decline_rate": device_trends.battery_capacity_decline_per_month,
            "performance_degradation": device_trends.cpu_performance_decline,
            "storage_health_decline": device_trends.storage_health_trend
        },
        "fleet_comparison": {
            "devices_in_comparison": fleet_trends.comparison_device_count,
            "thermal_performance_percentile": fleet_trends.thermal_percentile_ranking(device_trends.thermal_performance_slope),
            "battery_health_percentile": fleet_trends.battery_percentile_ranking(device_trends.battery_decline_rate),
            "overall_health_percentile": fleet_trends.overall_health_percentile,
            "performance_category": fleet_trends.performance_category
        },
        "predictive_insights": {
            "devices_with_similar_patterns": fleet_trends.similar_pattern_device_count,
            "average_failure_timeline": fleet_trends.avg_failure_timeline_for_pattern,
            "maintenance_success_rate": fleet_trends.maintenance_intervention_success_rate
        }
    }

@fleet_maintenance_agent.tool
async def query_fleet_failure_patterns(
    ctx: RunContext[Device360Dependencies]
) -> dict:
    """Query failure patterns across millions of devices in Device360."""
    
    # Get device profile
    device_profile = await ctx.deps.device360_client.query_device_by_id(ctx.deps.device_id)
    current_health = await ctx.deps.device360_client.get_current_device_health(ctx.deps.device_id)
    
    # Query failure patterns from millions of devices with similar characteristics
    failure_patterns = await ctx.deps.device360_client.query_failure_patterns(
        device_model=device_profile.model,
        age_range_months=(device_profile.age_months - 6, device_profile.age_months + 6),
        usage_intensity=device_profile.usage_intensity_score,
        current_health_range=(current_health.health_score - 0.1, current_health.health_score + 0.1),
        search_scope="global_fleet"  # Search across all millions of devices
    )
    
    return {
        "fleet_analysis_scope": {
            "total_devices_analyzed": failure_patterns.total_devices_in_analysis,
            "matching_devices_found": failure_patterns.similar_devices_count,
            "data_confidence_level": failure_patterns.statistical_confidence
        },
        "failure_predictions": {
            "30_day_failure_probability": failure_patterns.failure_probability_30_days,
            "90_day_failure_probability": failure_patterns.failure_probability_90_days,
            "most_likely_failure_components": failure_patterns.top_failure_components,
            "failure_mode_patterns": failure_patterns.common_failure_modes
        },
        "fleet_learnings": {
            "successful_interventions": failure_patterns.successful_maintenance_interventions,
            "intervention_timing_optimal": failure_patterns.optimal_intervention_timing,
            "cost_benefit_analysis": failure_patterns.intervention_cost_benefits
        }
    }

@fleet_maintenance_agent.tool
async def get_device_component_benchmarks(
    ctx: RunContext[Device360Dependencies]
) -> dict:
    """Benchmark device components against fleet-wide component health data."""
    
    # Get detailed component health for this specific device
    component_health = await ctx.deps.device360_client.get_component_health_detailed(
        device_id=ctx.deps.device_id
    )
    
    # Get device profile for fleet benchmarking
    device_profile = await ctx.deps.device360_client.query_device_by_id(ctx.deps.device_id)
    
    # Query component benchmarks across millions of similar devices
    component_benchmarks = await ctx.deps.device360_client.benchmark_components_vs_fleet(
        device_model=device_profile.model,
        component_types=component_health.component_types,
        device_age_months=device_profile.age_months,
        usage_pattern=device_profile.usage_classification
    )
    
    return {
        "component_analysis": {
            component: {
                "current_health_score": component_health.components[component].health_score,
                "fleet_percentile": component_benchmarks.get_component_percentile(component),
                "expected_lifespan_remaining": component_benchmarks.get_remaining_lifespan(component),
                "replacement_urgency": component_benchmarks.get_replacement_priority(component),
                "fleet_failure_rate": component_benchmarks.get_component_failure_rate(component)
            }
            for component in component_health.components
        },
        "fleet_insights": {
            "benchmark_device_count": component_benchmarks.total_benchmark_devices,
            "component_reliability_trends": component_benchmarks.reliability_trends,
            "recommended_monitoring_frequency": component_benchmarks.monitoring_recommendations
        }
    }

# Usage Example for Enterprise Fleet Management
async def enterprise_fleet_maintenance_analysis():
    """Example of analyzing multiple devices from millions in Device360."""
    
    device360_client = Device360Client(
        dataos_endpoint="https://your-dataos-instance.com",
        api_key="your-enterprise-api-key",
        data_product="device360"
    )
    
    # Enterprise fleet device IDs (subset from their total devices in Device360)
    enterprise_device_ids = [
        "LNV_ENT_X1C_001234567",
        "LNV_ENT_T14_002345678", 
        "LNV_ENT_P15_003456789",
        "LNV_ENT_X1C_004567890"
    ]
    
    maintenance_insights = []
    
    for device_id in enterprise_device_ids:
        deps = Device360Dependencies(
            device360_client=device360_client,
            device_id=device_id
        )
        
        result = await fleet_maintenance_agent.run(
            f"Analyze maintenance needs for device {device_id} using fleet intelligence",
            deps=deps
        )
        
        maintenance_insights.append({
            "device_id": device_id,
            "analysis": result.data
        })
    
    # Sort by risk level and fleet percentile
    high_risk_devices = [
        insight for insight in maintenance_insights 
        if insight["analysis"].fleet_risk_level in [FleetRiskLevel.FLEET_OUTLIER, FleetRiskLevel.ABOVE_FLEET_AVERAGE]
    ]
    
    print(f"Enterprise Fleet Analysis (from Device360's millions of devices):")
    print(f"Total devices analyzed: {len(enterprise_device_ids)}")
    print(f"High-risk devices identified: {len(high_risk_devices)}")
    
    for device in high_risk_devices:
        analysis = device["analysis"]
        print(f"\nDevice ID: {device['device_id']}")
        print(f"Fleet Risk Level: {analysis.fleet_risk_level}")
        print(f"Fleet Percentile: {analysis.fleet_percentile}th percentile")
        print(f"Failure Probability (30-day): {analysis.predicted_failure_probability:.2%}")
        print(f"Similar devices analyzed: {analysis.similar_devices_analyzed:,}")
        print(f"Fleet Insights: {analysis.fleet_comparison_insights}")
```

---

## Example 3: Product Intelligence Agent with Fleet-Wide Usage Analytics

**Use Case**: AI agent that analyzes individual device usage patterns within the context of millions of devices for product insights and recommendations.

```python
from pydantic import BaseModel, Field
from pydantic_ai import Agent, RunContext
from typing import List, Dict
from enum import Enum

class UsageCategory(str, Enum):
    LIGHT_OFFICE = "light_office"
    HEAVY_BUSINESS = "heavy_business"
    CREATIVE_PROFESSIONAL = "creative_professional"
    DEVELOPMENT_WORKSTATION = "development_workstation"
    MANUFACTURING_CONTROL = "manufacturing_control"
    MOBILE_ROAD_WARRIOR = "mobile_road_warrior"

class FleetPositioning(str, Enum):
    TOP_5_PERCENT = "top_5_percent"
    TOP_QUARTILE = "top_quartile"  
    ABOVE_AVERAGE = "above_average"
    FLEET_AVERAGE = "fleet_average"
    BELOW_AVERAGE = "below_average"
    BOTTOM_QUARTILE = "bottom_quartile"
    BOTTOM_5_PERCENT = "bottom_5_percent"

class ProductIntelligenceResponse(BaseModel):
    device_id: str = Field(description="Unique device identifier")
    usage_category: UsageCategory = Field(description="AI-identified usage pattern")
    fleet_positioning: FleetPositioning = Field(description="How device performs vs fleet")
    usage_intensity_percentile: int = Field(description="Usage intensity vs similar devices", ge=0, le=100)
    performance_optimization_score: float = Field(description="How well configured for usage", ge=0.0, le=1.0)
    fleet_benchmark_insights: str = Field(description="Key insights from fleet comparison")
    configuration_recommendations: List[str] = Field(description="Recommendations based on fleet learnings")
    upgrade_analysis: str = Field(description="Upgrade recommendations using fleet intelligence")
    similar_devices_in_analysis: int = Field(description="Number of similar devices compared")

# Product intelligence agent with fleet analytics
product_intelligence_agent = Agent(
    'openai:gpt-4o',
    deps_type=Device360Dependencies,
    result_type=ProductIntelligenceResponse,
    system_prompt=(
        "You are a Lenovo product intelligence AI with access to Device360 data product "
        "containing usage patterns and performance data from millions of devices. "
        "Analyze individual device usage within fleet context to provide intelligent "
        "product recommendations, configuration optimizations, and upgrade strategies."
    )
)

@product_intelligence_agent.tool
async def analyze_usage_vs_fleet_patterns(
    ctx: RunContext[Device360Dependencies],
    analysis_period_days: int = 90
) -> dict:
    """Analyze device usage patterns compared to millions of devices in Device360."""
    
    # Get specific device usage analytics
    device_usage = await ctx.deps.device360_client.get_device_usage_analytics(
        device_id=ctx.deps.device_id,
        period_days=analysis_period_days
    )
    
    # Get device profile for fleet comparison
    device_profile = await ctx.deps.device360_client.query_device_by_id(ctx.deps.device_id)
    
    # Query usage patterns across millions of similar devices
    fleet_usage_patterns = await ctx.deps.device360_client.analyze_fleet_usage_patterns(
        device_model=device_profile.model,
        configuration_type=device_profile.configuration_tier,
        industry_segment=device_profile.customer_industry,
        analysis_scope="global_fleet"  # Analyze across all millions of devices
    )
    
    return {
        "device_usage_profile": {
            "primary_applications": device_usage.top_applications_by_time,
            "usage_intensity_score": device_usage.calculated_intensity_score,
            "productivity_patterns": device_usage.productivity_time_analysis,
            "resource_utilization": device_usage.avg_resource_consumption,
            "mobility_behavior": device_usage.docking_undocking_frequency
        },
        "fleet_comparison": {
            "total_devices_in_comparison": fleet_usage_patterns.comparison_device_count,
            "usage_intensity_percentile": fleet_usage_patterns.intensity_percentile_ranking,
            "application_usage_similarity": fleet_usage_patterns.app_usage_similarity_score,
            "performance_efficiency_ranking": fleet_usage_patterns.efficiency_percentile,
            "usage_category_confidence": fleet_usage_patterns.category_classification_confidence
        },
        "fleet_insights": {
            "similar_usage_pattern_count": fleet_usage_patterns.similar_pattern_devices,
            "optimization_opportunities": fleet_usage_patterns.identified_optimizations,
            "configuration_effectiveness": fleet_usage_patterns.config_performance_analysis
        }
    }

@product_intelligence_agent.tool
async def benchmark_performance_vs_fleet(
    ctx: RunContext[Device360Dependencies]
) -> dict:
    """Benchmark device performance against fleet of similar configurations."""
    
    # Get device performance metrics
    device_performance = await ctx.deps.device360_client.get_device_performance_metrics(
        device_id=ctx.deps.device_id,
        include_detailed_breakdown=True
    )
    
    # Get device configuration details
    device_profile = await ctx.deps.device360_client.query_device_by_id(ctx.deps.device_id)
    
    # Benchmark against millions of similar devices in Device360
    performance_benchmarks = await ctx.deps.device360_client.benchmark_device_performance(
        device_model=device_profile.model,
        ram_configuration=device_profile.memory_gb,
        storage_type=device_profile.storage_type,
        cpu_tier=device_profile.processor_tier,
        usage_pattern=device_profile.usage_classification
    )
    
    return {
        "performance_metrics": {
            "cpu_performance_score": device_performance.cpu_benchmark_score,
            "memory_efficiency": device_performance.memory_utilization_efficiency,
            "storage_performance": device_performance.storage_iops_score,
            "overall_system_performance": device_performance.composite_performance_score
        },
        "fleet_benchmarking": {
            "devices_in_benchmark": performance_benchmarks.total_benchmark_devices,
            "cpu_performance_percentile": performance_benchmarks.cpu_percentile,
            "memory_efficiency_percentile": performance_benchmarks.memory_percentile,
            "storage_performance_percentile": performance_benchmarks.storage_percentile,
            "overall_performance_percentile": performance_benchmarks.overall_percentile
        },
        "optimization_analysis": {
            "underperforming_components": performance_benchmarks.bottleneck_components,
            "configuration_recommendations": performance_benchmarks.config_optimizations,
            "upgrade_impact_predictions": performance_benchmarks.upgrade_performance_estimates
        }
    }

@product_intelligence_agent.tool
async def query_fleet_configuration_success_rates(
    ctx: RunContext[Device360Dependencies]
) -> dict:
    """Query configuration success rates across millions of devices."""
    
    # Get current device configuration
    device_profile = await ctx.deps.device360_client.query_device_by_id(ctx.deps.device_id)
    device_usage = await ctx.deps.device360_client.get_device_usage_summary(ctx.deps.device_id)
    
    # Query configuration success rates across Device360's millions of devices
    config_analytics = await ctx.deps.device360_client.analyze_configuration_success_rates(
        usage_category=device_usage.classified_usage_category,
        workload_characteristics=device_usage.workload_profile,
        search_across_millions=True
    )
    
    return {
        "current_configuration_analysis": {
            "configuration_tier": device_profile.configuration_description,
            "suitability_score": config_analytics.current_config_suitability_score,
            "performance_efficiency": config_analytics.config_efficiency_rating
        },
        "fleet_configuration_intelligence": {
            "total_similar_configurations": config_analytics.similar_config_device_count,
            "success_rate_current_config": config_analytics.current_config_success_rate,
            "top_performing_configurations": config_analytics.best_performing_configs,
            "configuration_satisfaction_scores": config_analytics.user_satisfaction_by_config
        },
        "recommendation_analysis": {
            "optimal_configurations": config_analytics.recommended_configurations,
            "upgrade_roi_projections": config_analytics.upgrade_roi_estimates,
            "configuration_gap_analysis": config_analytics.performance_gap_analysis
        }
    }

# Usage Example for Sales Team Configuration Intelligence
async def sales_configuration_intelligence():
    """Example of using Device360 fleet intelligence for sales configuration advice."""
    
    device360_client = Device360Client(
        dataos_endpoint="https://your-dataos-instance.com",
        api_key="your-sales-team-api-key", 
        data_product="device360"
    )
    
    # Customer's current device ID (from Device360's millions of tracked devices)
    current_device_id = "LNV_ENT_T14_CUSTOMER_789"
    
    deps = Device360Dependencies(
        device360_client=device360_client,
        device_id=current_device_id
    )
    
    # Sales scenario
    sales_query = """
    Analyze this customer's current ThinkPad T14 usage patterns against our fleet 
    of millions of devices. They're considering upgrading because they feel their 
    device is slow for their CAD design work. Provide configuration recommendations 
    based on how similar users' devices perform across our entire fleet.
    """
    
    result = await product_intelligence_agent.run(sales_query, deps=deps)
    
    print(f"Product Intelligence Analysis for Device: {current_device_id}")
    print(f"Usage Category: {result.data.usage_category}")
    print(f"Fleet Positioning: {result.data.
