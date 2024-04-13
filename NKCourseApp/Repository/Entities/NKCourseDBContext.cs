using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace NKCourseApp.Repository.Entities
{
    public partial class NKCourseDBContext : DbContext
    {
        public NKCourseDBContext()
        {
        }

        public NKCourseDBContext(DbContextOptions<NKCourseDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AddTopic> AddTopics { get; set; } = null!;
        public virtual DbSet<Candidate> Candidates { get; set; } = null!;
        public virtual DbSet<Option> Options { get; set; } = null!;
        public virtual DbSet<OptionType> OptionTypes { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<Test> Tests { get; set; } = null!;
        public virtual DbSet<Topic> Topics { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=DESKTOP-G6JREC7\\SQLEXPRESS;Initial Catalog=NKCourseDB;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AddTopic>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.OptionType).HasColumnName("optionType");

                entity.Property(e => e.Question).HasColumnName("question");

                entity.Property(e => e.Test).HasColumnName("test");

                entity.Property(e => e.TopicId).HasColumnName("topicId");

                entity.Property(e => e.TopicOrder).HasColumnName("topicOrder");
            });

            modelBuilder.Entity<Candidate>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("candidates");

                entity.Property(e => e.Address).HasMaxLength(255);

                entity.Property(e => e.EmailId).HasMaxLength(255);

                entity.Property(e => e.FirstName)
                    .HasMaxLength(255)
                    .HasColumnName("firstName");

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("id");

                entity.Property(e => e.LastName)
                    .HasMaxLength(255)
                    .HasColumnName("lastName");

                entity.Property(e => e.Mobile)
                    .HasMaxLength(255)
                    .HasColumnName("mobile");

                entity.Property(e => e.Password)
                    .HasMaxLength(255)
                    .HasColumnName("password");

                entity.Property(e => e.PhoneNumber)
                    .HasMaxLength(255)
                    .HasColumnName("phoneNumber");

                entity.Property(e => e.Roleid).HasColumnName("roleid");
            });

            modelBuilder.Entity<Option>(entity =>
            {
                entity.ToTable("options");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AddTopicId).HasColumnName("addTopicId");
            });

            modelBuilder.Entity<OptionType>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("optionType");

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("id");

                entity.Property(e => e.Options).HasColumnName("options");

                entity.Property(e => e.Type)
                    .HasMaxLength(255)
                    .HasColumnName("type");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("role");

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("id");

                entity.Property(e => e.Name).HasMaxLength(255);
            });

            modelBuilder.Entity<Test>(entity =>
            {
                entity.ToTable("Test");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Test1)
                    .HasMaxLength(255)
                    .HasColumnName("test");
            });

            modelBuilder.Entity<Topic>(entity =>
            {
                entity.HasNoKey();

                entity.ToTable("topic");

                entity.Property(e => e.Id)
                    .ValueGeneratedOnAdd()
                    .HasColumnName("id");

                entity.Property(e => e.Title)
                    .HasMaxLength(255)
                    .HasColumnName("title");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
