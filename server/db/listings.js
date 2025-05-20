import { pool } from "./db.js";

export async function upsertListing(listing) {
  const COLUMN_COUNT = 111;

  const values = [
    listing.ListingId,
    listing.ListingKey,
    listing.ListOfficeKey,
    listing.ListAgentKey,
    listing.CoListOfficeKey,
    listing.CoListAgentKey,
    listing.ListPrice,
    listing.AvailabilityDate,
    listing.LeaseAmount,
    listing.LeaseAmountFrequency,
    listing.LeasePerUnit,
    listing.PricePerUnit,
    listing.WaterBodyName,
    listing.NumberOfBuildings,
    listing.NumberOfUnitsTotal,
    listing.LotSizeArea,
    listing.LotSizeDimensions,
    listing.LotSizeUnits,
    listing.FrontageLengthNumeric,
    listing.FrontageLengthNumericUnits,
    listing.TotalActualRent,
    listing.AssociationFee,
    listing.AssociationFeeFrequency,
    listing.AssociationName,
    listing.OriginalEntryTimestamp,
    listing.ModificationTimestamp,
    listing.StandardStatus,
    listing.StatusChangeTimestamp,
    listing.PublicRemarks,
    listing.ListingURL,
    listing.OriginatingSystemName,
    listing.PhotosCount,
    listing.PhotosChangeTimestamp,
    listing.CommonInterest,
    listing.ListAOR,
    listing.ListAORKey,
    listing.UnparsedAddress,
    listing.PostalCode,
    listing.SubdivisionName,
    listing.StateOrProvince,
    listing.StreetDirPrefix,
    listing.StreetDirSuffix,
    listing.StreetName,
    listing.StreetNumber,
    listing.StreetSuffix,
    listing.UnitNumber,
    listing.Country,
    listing.City,
    listing.Directions,
    listing.Latitude,
    listing.Longitude,
    listing.CityRegion,
    listing.MapCoordinateVerifiedYN,
    listing.ParkingTotal,
    listing.YearBuilt,
    listing.BathroomsPartial,
    listing.BathroomsTotalInteger,
    listing.BedroomsTotal,
    listing.BedroomsAboveGrade,
    listing.BedroomsBelowGrade,
    listing.LivingArea,
    listing.LivingAreaUnits,
    listing.BuildingAreaTotal,
    listing.BuildingAreaUnits,
    listing.ParcelNumber,
    listing.Zoning,
    listing.ZoningDescription,
    listing.TaxAnnualAmount,
    listing.TaxYear,
    listing.InternetEntireListingDisplayYN,
    listing.InternetAddressDisplayYN,
    listing.PropertySubType,
    listing.DocumentsAvailable,
    listing.BusinessType,
    listing.View,
    listing.LotFeatures,
    listing.PoolFeatures,
    listing.RoadSurfaceType,
    listing.CurrentUse,
    listing.PossibleUse,
    listing.WaterfrontFeatures,
    listing.CommunityFeatures,
    listing.Fencing,
    listing.Appliances,
    listing.OtherEquipment,
    listing.SecurityFeatures,
    listing.AssociationFeeIncludes,
    listing.BuildingFeatures,
    listing.ArchitecturalStyle,
    listing.Heating,
    listing.Basement,
    listing.ExteriorFeatures,
    listing.Flooring,
    listing.ParkingFeatures,
    listing.Cooling,
    listing.PropertyCondition,
    listing.Roof,
    listing.ConstructionMaterials,
    listing.Stories,
    listing.FoundationDetails,
    listing.Sewer,
    listing.WaterSource,
    listing.Utilities,
    listing.IrrigationSource,
    listing.Electric,
    listing.AccessibilityFeatures,
    listing.StructureType,
    listing.FireplaceFeatures,
    listing.FireplacesTotal,
    listing.FireplaceYN,
    JSON.stringify(listing), // raw_data
  ];

  // ✅ Pad or trim to exactly COLUMN_COUNT
  if (values.length > COLUMN_COUNT) {
    console.error(
      `❌ Too many values for listing ${listing.ListingId}. Expected ${COLUMN_COUNT}, got ${values.length}`
    );
    values.length = COLUMN_COUNT;
  } else if (values.length < COLUMN_COUNT) {
    console.warn(
      `⚠️ Listing ${listing.ListingId}: missing ${
        COLUMN_COUNT - values.length
      } values. Padding with null.`
    );
    while (values.length < COLUMN_COUNT) {
      values.push(null);
    }
  }

  const query = `
    INSERT INTO listings (
      listing_id, listing_key, list_office_key, list_agent_key,
      colist_office_key, colist_agent_key, list_price, availability_date,
      lease_amount, lease_amount_frequency, lease_per_unit, price_per_unit,
      water_body_name, number_of_buildings, number_of_units_total,
      lot_size_area, lot_size_dimensions, lot_size_units, frontage_length_numeric,
      frontage_length_numeric_units, total_actual_rent, association_fee,
      association_fee_frequency, association_name, original_entry_timestamp,
      modification_timestamp, status, status_change_timestamp, description,
      listing_url, originating_system_name, photos_count, photos_change_timestamp,
      common_interest, list_aor, list_aor_key, unparsed_address, postal_code,
      subdivision_name, province, street_dir_prefix, street_dir_suffix,
      street_name, street_number, street_suffix, unit_number, country, city,
      directions, latitude, longitude, city_region, map_coordinate_verified,
      parking_total, year_built, bathrooms_partial, bathrooms_total_integer,
      bedrooms_total, bedrooms_above_grade, bedrooms_below_grade, living_area,
      living_area_units, building_area_total, building_area_units, parcel_number,
      zoning, zoning_description, tax_annual_amount, tax_year,
      internet_entire_listing_display_yn, internet_address_display_yn,
      property_sub_type, documents_available, business_type, view, lot_features,
      pool_features, road_surface_type, current_use, possible_use,
      waterfront_features, community_features, fencing, appliances, other_equipment,
      security_features, association_fee_includes, building_features,
      architectural_style, heating, basement, exterior_features, flooring,
      parking_features, cooling, property_condition, roof, construction_materials,
      stories, foundation_details, sewer, water_source, utilities, irrigation_source,
      electric, accessibility_features, structure_type, fireplace_features,
      fireplaces_total, fireplace_yn, raw_data
    )
    VALUES (
      ${Array.from({ length: COLUMN_COUNT }, (_, i) => `$${i + 1}`).join(", ")}
    )
    ON CONFLICT (listing_id) DO UPDATE SET
      raw_data = EXCLUDED.raw_data,
      modification_timestamp = EXCLUDED.modification_timestamp,
      updated_at = NOW()
  `;

  await pool.query(query, values);
}
