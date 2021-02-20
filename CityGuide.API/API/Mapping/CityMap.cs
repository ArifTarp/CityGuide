using API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Mapping
{
    public class CityMap : IEntityTypeConfiguration<City>
    {
        public void Configure(EntityTypeBuilder<City> builder)
        {
            builder.ToTable("Cities");
            builder.HasKey(c => c.Id);

            builder.HasOne(c => c.User).WithMany(u => u.Cities).HasForeignKey(c => c.UserId).OnDelete(DeleteBehavior.Cascade);
            builder.HasMany(c => c.Photos).WithOne(p => p.City).HasForeignKey(p => p.CityId).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
