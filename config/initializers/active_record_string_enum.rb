module ActiveRecord
  module Enum
    def string_enum(definitions)
      enum_prefix = definitions.delete(:_prefix)
      enum_suffix = definitions.delete(:_suffix)

      raise 'Invalid string_enum values' if definitions.keys.size > 1
      enum_key = definitions.keys.first
      enum_values = definitions[enum_key]

      enum enum_key, enum_values.index_with { |value| value.to_s.freeze }, **{ prefix: enum_prefix, suffix: enum_suffix }.compact
    end
  end
end
