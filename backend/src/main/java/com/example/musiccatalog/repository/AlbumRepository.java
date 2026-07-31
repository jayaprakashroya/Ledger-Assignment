package com.example.musiccatalog.repository;

import com.example.musiccatalog.model.Album;
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

/**
 * Repository interface for Album entity.
 */
@Repository
public interface AlbumRepository extends JpaRepository<Album, Long> {
    
    List<Album> findByUser(User user);
    
    Page<Album> findByUser(User user, Pageable pageable);
    
    Optional<Album> findByIdAndUser(Long id, User user);
    
    Optional<Album> findByAppleCatalogId(Long appleCatalogId);
    
    List<Album> findByUserAndGenreIgnoreCase(User user, String genre);
    
    @Query("SELECT a FROM Album a WHERE a.user = :user AND LOWER(a.artistName) LIKE LOWER(CONCAT('%', :artistName, '%'))")
    List<Album> findByUserAndArtistNameContainingIgnoreCase(@Param("user") User user, @Param("artistName") String artistName);
    
    @Query("SELECT a FROM Album a WHERE a.user = :user AND a.releaseDate BETWEEN :startDate AND :endDate")
    List<Album> findByUserAndReleaseDateBetween(@Param("user") User user, @Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
    
    @Query("SELECT COUNT(a) FROM Album a WHERE a.user = :user")
    Long countByUser(@Param("user") User user);
    
    @Query("SELECT a.genre, COUNT(a) FROM Album a WHERE a.user = :user GROUP BY a.genre")
    List<Object[]> countByGenreForUser(@Param("user") User user);
    
    @Query("SELECT YEAR(a.releaseDate) as year, COUNT(a) FROM Album a WHERE a.user = :user GROUP BY YEAR(a.releaseDate) ORDER BY year DESC")
    List<Object[]> countByReleaseYearForUser(@Param("user") User user);
    
    boolean existsByAppleCatalogIdAndUser(Long appleCatalogId, User user);
}
