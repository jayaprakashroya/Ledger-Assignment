package com.example.musiccatalog.repository;

import com.example.musiccatalog.model.LibraryItem;
import com.example.musiccatalog.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface LibraryItemRepository extends JpaRepository<LibraryItem, UUID> {

    Page<LibraryItem> findByUser(User user, Pageable pageable);

    List<LibraryItem> findByUser(User user);

    Optional<LibraryItem> findByIdAndUser(UUID id, User user);

    boolean existsByUserAndAppleCatalogId(User user, Long appleCatalogId);

    List<LibraryItem> findByUserAndGenreIgnoreCase(User user, String genre);

    @Query("SELECT a FROM LibraryItem a WHERE a.user = :user AND LOWER(a.artistName) LIKE LOWER(CONCAT('%', :artistName, '%'))")
    List<LibraryItem> findByUserAndArtistNameContainingIgnoreCase(@Param("user") User user, @Param("artistName") String artistName);

    @Query("SELECT a FROM LibraryItem a WHERE a.user = :user AND a.releaseDate BETWEEN :startDate AND :endDate")
    List<LibraryItem> findByUserAndReleaseDateBetween(@Param("user") User user, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

}
